const Task = require('../db/models/task_model.js/index.js')

exports.addTask = ({ title, description }) => new Promise(async (resolve, reject) => {
  try {
    if (!title) {
      resolve({
        success: false,
        message: 'title is required'
      })
    }

    const newTask = new Task({
      title,
      description
    })

    const task = await newTask.save()

    resolve({
      success: true,
      data: task
    })
  } catch (error) {
    reject(error)
  }
})

exports.getTasks = () => new Promise(async (resolve, reject) => {
  try {
    console.log('getTasks')
    let tasks = await Task.find()
    resolve(tasks)
  } catch (error) {
    reject(error)
  }
})
