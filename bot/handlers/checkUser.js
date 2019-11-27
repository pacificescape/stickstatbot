const got = require('got')

module.exports = ({chat}) => new Promise(async (resolve, reject) => {
    try {
        got.post('http://localhost:3000/checkUser', {
            body: chat,
            json: true
        })
        .then(() => resolve())
        .catch((err) => {
            console.log('bot: Ошибка запроса метода /checkUser')
            reject(err)
        })
    } catch (error) {
        console.log(error)
        reject()
    }
})