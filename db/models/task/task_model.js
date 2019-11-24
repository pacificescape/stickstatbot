const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Task', Schema, 'Tasks')