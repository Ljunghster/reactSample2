const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: 'PostId is required.',
    },
    userId: {
        type: String,
        required: 'UserId is required.',
    },
    comment: {
        type: String,
        required: 'Comment is required.',
    },
    isHidden: {
        type: Boolean,
        required: 'isHidden is required.',
        default: false,
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
