

const User = require('../models/userModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'useruploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const useruploads = multer({ storage });



const getUsers = async (req, res) => {
    try{
        const UserMessages = await User.find();
        res.status(200).json(UserMessages);

    }catch (error){
        res.status(404).json({ message: error.message});
    } 

};





const createUser = async (req, res) => {
    
    const { username, email, password } = req.body;

    const newUser = new User({
    username,
    email,
    password
  });
    try{
       await newUser.save(); 
       res.status(201).json(newUser);

    }catch(error){
        res.status(409).json({message:error.message});
    }
};




const loginUser = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });

    }
 
    res.status(200).json({ 
      
      message: 'Login successful',
      user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      profilePicture: user.profilePicture ? `http://localhost:3001/${user.profilePicture}` : null
    }

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const fetchMe = async (req, res) => {

  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
  
    res.status(200).json({ 
      
      user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      profilePicture: user.profilePicture ? `http://localhost:3001/${user.profilePicture}` : null
    }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateUser = async (req, res) => {

    const { id: _id } = req.params;
    const { name, email, password, bio } = req.body;
    const profilePicture = req.files?.profilePicture ? req.files.profilePicture[0].path : req.body.profilePicture;
  
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("No user with that id");

    const updatedUser = await User.findByIdAndUpdate(
    _id,
    { name, email, password, bio, profilePicture },
    { new: true }
  );
    res.json(updatedUser);
};



const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).json({ message: "No user with that id" });


  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getUsers,  getUserById, createUser, updateUser, loginUser, fetchMe, useruploads };