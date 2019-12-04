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
  size: {
    type: Number,
    required: true
  },
  stickers: [{
    width: Number,
    height: Number,
    emoji: String,
    set_name: String,
    is_animated: Boolean,
    file_id: String,
    thumb: Object
  }],
  main: {
    total_installed: { type: Number, default: 0 },
    total_removed: { type: Number, default: 0 },
    total_usage: { type: Number, default: 0 },
    date: Date
  },
  day: [{
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    date: Date
  }],
  month: [{
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    date: Date
  }],
  year: [{
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    date: Date
  }]
}, {
  timestamps: true
})

module.exports = Pack
