const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

connection.catch((error) => {
  console.log('DB error', error)
})

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose connection closed throw app termination')
    process.exit(0)
  })
})

module.exports = connection
