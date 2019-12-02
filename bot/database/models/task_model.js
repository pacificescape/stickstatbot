const mongoose = require('mongoose')

const Task = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = Task
// module.exports = mongoose.model('Pack', Schema, 'Packs')
