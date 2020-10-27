const mongoose = require('mongoose')

const StatsScheme = mongoose.Schema({
  date: Date,
  stickers: { // sended
    type: Number,
    default: 0
  },
  packs: {
    type: Number,
    default: 0
  },
  inline: { // requests
    type: Number,
    default: 0
  },
  private: { // requests
    type: Number,
    default: 0
  },
  users: [{
    type: Number,
    default: 0
  }],
  generated: {
    type: Number,
    default: 0
  },
  latency: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = StatsScheme
