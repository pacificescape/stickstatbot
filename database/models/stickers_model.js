const mongoose = require('mongoose')

const Stickers = new mongoose.Schema({
  pack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pack'
  },
  contains_masks: Boolean,
  is_animated: Boolean,
  name: String,
  title: String,
  stickers: [{
    type: Object
  }]
})

module.exports = Stickers
