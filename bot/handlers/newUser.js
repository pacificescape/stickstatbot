const got = require('got')

module.exports = ({chat}) => new Promise(async (resolve, reject) => {
    try {
        got.post('http://localhost:3000/newUser', {
            body: chat,
            json: true
        })
        .then(() => resolve())
        .catch((err) => {
            console.log('bot: Ошибка метода /newUser')
            reject(err)
        })
    } catch (error) {
        console.log(error)
        reject()
    }
})