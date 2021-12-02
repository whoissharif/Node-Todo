const mongoose = require('mongoose');


const replySchema = mongoose.Schema({
    'token': {
        type: String
    },
    'content': {
        type: String
    },
    'commentToken': {
        type: String
    },
    'postToken': {
        type: String
    },
    'replierToken': {
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


module.exports = mongoose.model('Reply', replySchema);