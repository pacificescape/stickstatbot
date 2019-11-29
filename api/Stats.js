const Stats = require('../db/models/stats/stats_model')
const User = require('../db/models/user/user_model')


exports.setStats = (stats) => new Promise(async (resolve, reject) => {
    console.log(stats)
    console.log(new Date(stats.day).toLocaleDateString())
    try {
        // if (!title) {
        //     resolve({
        //         success: false,
        //         message: 'title is required'
        //     })
        // }
        console.log(db)
        
        let user = await User.findOne({telegram_id: stats.telegram_id})
        console.log(user)
        
        // const newStats = new Stats({
        //     title,
        //     description
        // })

        // const task = await newTask.save()

        resolve({
            success: true,
            data: task
        })
    } catch (error) {
        reject()
    }
})

exports.getStats = () => new Promise(async (resolve, reject) => {
    try {
        console.log('getTasks')
        let tasks = await Task.find()
        resolve(tasks)
    } catch (error) {
        reject()
    }
})