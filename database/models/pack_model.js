const mongoose = require('mongoose')

const Pack = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  private: Boolean,
  contains_masks: Boolean,
  is_animated: Boolean,
  name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  title: {
    type: String,
    index: true,
    required: true
  },
  thumb: String,
  size: {
    type: Number,
    required: true
  },
  main: { // добавить историю в main. сделать рейтлимит на добавление. облегчить модель
    total_installed: { type: Number, default: 0 },
    total_removed: { type: Number, default: 0 },
    total_usage: { type: Number, default: 0 },
    date: Date
  },
  day: [{ // вынести?
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    date: Date
  }],
  month: [{ // вынести?
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    date: Date
  }],
  year: [{ // вынести?
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    date: Date
  }]
}, {
  timestamps: true
})

module.exports = Pack
