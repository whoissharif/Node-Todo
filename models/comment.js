const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'content': {
        type: String
    },
    'postToken': {
        type: String
    },
    'posterToken': {
        type: String
    },
    'commenterToken': {
        type: String
    },
    'status': {
        type: String
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Comment', commentSchema);