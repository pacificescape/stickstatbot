const collections = require('./models')
const quotAfStats = require('./quotaf/stats')
const connection = require('./connection')
const quotAfConnection = require('./connectionQuotAf')

const db = {
  connection
}

Object.keys(collections).forEach((collectionName) => {
  db[collectionName] = connection.model(collectionName, collections[collectionName])
})

db.quotAf = quotAfConnection.model('Stats', quotAfStats)

module.exports = {
  db
}
