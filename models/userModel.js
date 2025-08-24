
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    id : Number,
    name : String,
    email : String,
    password : String,
    profilePicture : String,
    bio : String,
   

});

const User = mongoose.model('User', userSchema); 

module.exports = User;