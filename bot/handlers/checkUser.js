const got = require('got')

module.exports = (message) => new Promise(async (resolve, reject) => {
  try {
    got.post('http://localhost:3000/checkUser', {
      body: message,
      json: true
    })
      .then(() => resolve())
      .catch((err) => {
        console.log('bot: Ошибка запроса метода /checkUser')
        reject(err)
      })
  } catch (error) {
    console.log(error)
  }
})
