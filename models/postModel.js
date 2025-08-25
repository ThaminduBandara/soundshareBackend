
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    
    title : String,
    caption : String,
    creator : String,
    username: String,
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{
        user: String,
        comment: String,
      
    }],

    commentCount: {
        type: Number,
        default: 0
   
    },
    selectedMFile : String,
    selectedPFile : String

});

const Post = mongoose.model('Post', postSchema); 

module.exports = Post;