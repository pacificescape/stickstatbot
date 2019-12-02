const mongoose = require('mongoose')

const Pack = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
    file_id: String
  }],
  thumbs: [{
    file_id: String,
    file_size: Number,
    height: Number,
    width: Number
  }],
  current_stats: {
    installed: { type: Number, default: 0 },
    removed: { type: Number, default: 0 },
    Usage: { type: Number, default: 0 }
  },
  all_stats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stats'
  }

}, {
  timestamps: true
})

module.exports = Pack
