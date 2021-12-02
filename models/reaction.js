const mongoose = require('mongoose');


const reactionSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'reaction': {
        type: String
    },
    'reactorToken': {
        type: String
    },
    'postToken': {
        type: String
    },
    'posterToken': {
        type: String
    },
    'status': {
        type: String
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Reaction', reactionSchema);