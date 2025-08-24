

const Posts = require('../models/postModel');
// import Posts from '../models/postModel.js';

const getPosts = async (req, res, next) => {

    try{
        const PostMessages = await Posts.find();

        res.status(200).json(PostMessages);

    }catch (error){

        res.status(404).json({ message: error.message});
    } 
    
};


const createPost = async (req, res, next) => {

    const post = req.body;

    const newPost = new Posts(post);

    try{
       await newPost.save(); 

       res.status(201).json(newPost);

    }catch(error){
        res.status(409).json({message:error.message});

    }
};


const updatePost = async (req, res, next) => {

    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("No post with that id");

    const updatedPost = await Posts.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedPost);
}



exports.getPosts = getPosts;
exports.createPost = createPost;