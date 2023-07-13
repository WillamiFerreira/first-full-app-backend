const mongoose = require('mongoose');

const usersSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        min: 0,
        max: 120
        
    },
    parents: {
        type: Object
    },
    birthday:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', usersSchema);