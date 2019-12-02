const mongoose = require('mongoose')

const User = new mongoose.Schema({ // владелец пака указан в паке
  telegram_id: {
    type: Number,
    unique: true,
    required: [true, 'id is required']
  },
  first_name: String,
  last_name: String,
  username: String,
  stickerpacks: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
})

module.exports = User
