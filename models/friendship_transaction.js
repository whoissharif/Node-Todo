const mongoose = require('mongoose');


const friendshipTransactionSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'from': {
        type: String
    },
    'to': {
        type: String
    },
    'type': {
        type: String
    },
    'actionTime': {
        type: String
    },

}, {
    timestamps: true,
})


module.exports = mongoose.model('FriendshipTransaction', friendshipTransactionSchema);