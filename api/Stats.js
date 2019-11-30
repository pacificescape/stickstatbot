const Stats = require('../db/models/stats/stats_model')
const User = require('../db/models/user/user_model')
const newUser = require('../api/newUser')


exports.setStats = (stats) => new Promise(async (resolve, reject) => {
    console.log(stats)
    console.log(new Date(stats.day).toLocaleDateString())
    try {        
        const newStats = new Stats({
            title,
            description
        })

        const stat = await newStats.save()

        resolve({
            success: true,
            data: stat
        })
    } catch (error) {
        reject()
    }
})

exports.getStats = () => new Promise(async (resolve, reject) => {
    try {
        console.log('getStats')
        let tasks = await Task.find()
        resolve(tasks)
    } catch (error) {
        reject()
    }
})