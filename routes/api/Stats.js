const Stats = require('../db/models/stats/stats_model')
const User = require('../../db/models/user_model')

exports.setStats = ({ message, stats }, user) => new Promise(async (resolve, reject) => {
  console.log(stats)
  console.log(new Date(stats.day).toLocaleDateString())
  try {
    // дописать модель статистики
    // проверить статистику по имени пака ключу дате

    let stata = await Stats.find({ name: message.entities.url })
    // const newStats = new Stats({
    //     title,
    //     description
    // })

    // const stat = await newStats.save()

    resolve({ suck: 'sex' })
  } catch (error) {
    reject(error)
  }
})

// date:1575137532
// day:1442440800000
// forward_date:1575086214
// telegram_id:613242355
// total_installed:156
// total_removed:6
// total_usage:408
// type:"main"

// {
//     width: 512,
//     height: 512,
//     emoji: '😕',
//     set_name: 'fkey123',
//     is_animated: false,
//     thumb: [Object],
//     file_id: 'CAADBAAD6QAD81WNJMt6w4sYUSCRFgQ',
//     file_size: 32912
//   }

exports.getStats = (message, user) => new Promise(async (resolve, reject) => {
  try {
    console.log('getStats')
    // let stats = await Stats.find()
    resolve({ suck: 'sex' })
  } catch (error) {
    reject(error)
  }
})
