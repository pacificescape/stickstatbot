const checkUser = require('./checkUser')
const parseStats = require('./parseStats')
const parseMain = require('./parseMain')
const setStats = require('./setStats')
const parseType = require('./parseType')
const webAuth = require('./web-auth')
const getStats = require('./getStats')
const storeAllThumbs = require('./storeAllThumbs')

module.exports = {
  checkUser,
  parseStats,
  setStats,
  parseMain,
  parseType,
  webAuth,
  getStats,
  storeAllThumbs
}
