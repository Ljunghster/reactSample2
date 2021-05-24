const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true
    }
});

const scoreModel = mongoose.model('Score', scoreSchema);

module.exports = scoreModel;
