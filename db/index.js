const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const uri = process.env.MONGO_DB_URI

mongoose.connect(uri, {
    useNewUrlParser: true
})
.catch((error) => console.log(error))
const db = mongoose.connection

db.on('connected', () => {
    console.log('Mongoose connection open on Atlas')
})

db.on('error', () => {
    console.log('Failed to connect...')
})

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose connection closed throw app termination')
        process.exit(0)
    })
})