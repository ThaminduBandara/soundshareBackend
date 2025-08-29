

const Post = require('../models/postModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


const getPosts = async (req, res) => {
    try{
        const PostMessages = await Post.find();
        res.status(200).json(PostMessages);

    }catch (error){
        res.status(404).json({ message: error.message});
    } 

};





const createPost = async (req, res) => {
   
    const { title, caption, creator } = req.body;

    const selectedMFile = req.files?.selectedMFile ? `/uploads/${req.files.selectedMFile[0].filename}` : '';
    const selectedPFile = req.files?.selectedPFile ? `/uploads/${req.files.selectedPFile[0].filename}` : '';

    const newPost = new Post({
    title,
    caption,
    creator,
    selectedMFile,
    selectedPFile
  });
    try{
       await newPost.save(); 
       res.status(201).json(newPost);

    }catch(error){
        res.status(409).json({message:error.message});

    }
};




const updatePost = async (req, res) => {

    const { id: _id } = req.params;
    const { title, caption } = req.body;
    const selectedMFile = req.files?.selectedMFile ? req.files.selectedMFile[0].path : req.body.selectedMFile;
    const selectedPFile = req.files?.selectedPFile ? req.files.selectedPFile[0].path : req.body.selectedPFile;

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("No post with that id");

    const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { title, caption, selectedMFile, selectedPFile },
    { new: true }
  );

    res.json(updatedPost);
};



const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).json({ message: "No post with that id" });

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const deletePost = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send("No post with that id");

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    
 
    if (post.selectedMFile) {
      const audioPath = path.join(__dirname, '..', post.selectedMFile); 
      fs.unlink(audioPath, (err) => {
        if (err) console.log("Error deleting audio:", err);
        
      });
    }

    if (post.selectedPFile) {
      const imagePath = path.join(__dirname, '..', post.selectedPFile); 
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Error deleting image:", err);
        
      });
    }
    await Post.findByIdAndDelete(id);
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = { getPosts,  getPostById, createPost, updatePost, deletePost, upload };