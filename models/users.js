const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true,
        default: [2001]
    },
    date:{
        type: Date,
        default: Date.now
    },
    refreshToken: String

});



module.exports = mongoose.model('users', userSchema);
