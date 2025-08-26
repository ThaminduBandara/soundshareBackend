

const Posts = require('../models/postModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// const filepath = '/Users/thamindubandara/Documents/webapplication/soundsharebackend/uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


const getPosts = async (req, res, next) => {

    try{
        const PostMessages = await Posts.find();

        res.status(200).json(PostMessages);

    }catch (error){

        res.status(404).json({ message: error.message});
    } 

};


const createPost = async (req, res, next) => {

    // const post = req.body;
    const { title, caption } = req.body;

    // const newPost = new Posts(post);
    // const selectedMFile = req.files?.selectedMFile ? req.files.selectedMFile[0].path : '';
    // const selectedPFile = req.files?.selectedPFile ? req.files.selectedPFile[0].path : '';

    const selectedMFile = req.files?.selectedMFile ? `/uploads/${req.files.selectedMFile[0].filename}` : '';
    const selectedPFile = req.files?.selectedPFile ? `/uploads/${req.files.selectedPFile[0].filename}` : '';

    
    const newPost = new Posts({
    title,
    caption,
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




const updatePost = async (req, res, next) => {

    const { id: _id } = req.params;
    // const post = req.body;
    const { title, caption } = req.body;
    const selectedMFile = req.files?.selectedMFile ? req.files.selectedMFile[0].path : req.body.selectedMFile;
    const selectedPFile = req.files?.selectedPFile ? req.files.selectedPFile[0].path : req.body.selectedPFile;

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("No post with that id");

    // const updatedPost = await Posts.findByIdAndUpdate(_id, post, {new: true});

    const updatedPost = await Posts.findByIdAndUpdate(
    _id,
    { title, caption, selectedMFile, selectedPFile },
    { new: true }
  );

    res.json(updatedPost);
};



// exports.getPosts = getPosts;
// exports.createPost = createPost;
// exports.updatePost = updatePost;

module.exports = { getPosts, createPost, updatePost, upload };