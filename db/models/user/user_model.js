const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    id: {
        type: Number,
        required: [true, 'id is required']
    },
    first_name: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', Schema, 'Users')