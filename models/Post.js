const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: 'UserId is required.'
    },
    message: {
        type: String,
        required: 'Please enter a message.'
    },
    date: {
       type: Number,
       default: new Date().getTime() 
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
