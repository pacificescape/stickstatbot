// хранить статистику за день как {'2019': {year, '11': {month, '23': {stats}}}}????
// мб делаю массив объектов который сортирую перед апдейтом, в каждом обьекте будет день и месяц для поверки повторов

const mongoose = require('mongoose')

const packStatsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  title: String,
  stats: [{
    type: String,
    date: Number,
    installed: Number,
    removed: Number,
    usage: Number
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('packStat', packStatsSchema, 'PackStats')
