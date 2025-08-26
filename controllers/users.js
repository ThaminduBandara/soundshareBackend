
// const Users = require('../models/userModel');

// const getUsers = async (req, res, next) => {

//     try{
//         const users = await Users.find();

//         res.status(200).json(users);

//     }catch (error){

//         res.status(404).json({ message: error.message});
//     } 
// };


// const createUser = async (req, res, next) => {

//     const user = req.body;

//     const newUser = new Users(user);

//     try{
//        await newUser.save(); 

//        res.status(201).json(newUser);

//     }catch(error){
//         res.status(409).json({message:error.message});

//     }
// }

// exports.getUsers = getUsers;
// exports.createUser = createUser;




const User = require('../models/userModel');
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


const getUsers = async (req, res, next) => {

    try{
        const UserMessages = await User.find();
//
        res.status(200).json(UserMessages);

    }catch (error){

        res.status(404).json({ message: error.message});
    } 

};


const createUser = async (req, res, next) => {

  
    const { username, email, password } = req.body;


    // const selectedMFile = req.files?.selectedMFile ? `/uploads/${req.files.selectedMFile[0].filename}` : '';
    // const selectedPFile = req.files?.selectedPFile ? `/uploads/${req.files.selectedPFile[0].filename}` : '';

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




const updateUser = async (req, res, next) => {

    const { id: _id } = req.params;
   
    const { name, username, email, password, bio } = req.body;
    const profilePicture = req.files?.profilePicture ? req.files.profilePicture[0].path : req.body.profilePicture;
  

    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("No user with that id");

   
    const updatedUser = await User.findByIdAndUpdate(
    _id,
    { name, username, email, password, bio, profilePicture },
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



const deleteUser = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send("No user with that id");
//

  try {
    
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // res.status(200).json({ message: "Post deleted successfully" });
 
  
    if (user.profilePicture) {
      const imagePath = path.join(__dirname, '..', user.profilePicture); 
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Error deleting image:", err);
        // else console.log("Image deleted:", imagePath);
      });
    }
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.error("Delete User error:", error);
    res.status(500).json({ message: error.message });
  }
};




// exports.getPosts = getPosts;
// exports.createPost = createPost;
// exports.updatePost = updatePost;

module.exports = { getUsers,  getUserById, createUser, updateUser, deleteUser, upload };