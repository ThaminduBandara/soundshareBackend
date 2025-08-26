
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    
    name : String,
    username: String,
    email : String,
    password : String,
    profilePicture : String,
    bio : String,
    followers: Number,
    following: Number
   

});

const User = mongoose.model('User', userSchema); 

module.exports = User;