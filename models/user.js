const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    'username': {
        type: String
    },
    'password': {
        type: String
    },
    'firstName': {
        type: String
    },
    'lastName': {
        type: String
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('User', userSchema);