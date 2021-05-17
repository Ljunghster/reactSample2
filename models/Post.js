const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: 'UserId is required.'
    },
    message: {
        type: String,
    },
    date: {
       type: Number,
       default: new Date().getTime() 
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
