
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
    following: Number,
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },

});

const User = mongoose.model('User', userSchema); 

module.exports = User;