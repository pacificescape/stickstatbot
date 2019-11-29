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
}, {
    timestamps: true,
})

module.exports = mongoose.model('Pack', Schema, 'Packs')