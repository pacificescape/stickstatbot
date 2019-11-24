const got = require('got')

module.exports = ({chat}) => new Promise(async (resolve, reject) => {
    try {
        got.post('http://localhost:3000/newUser', {
            body: chat,
            json: true
        })
        .then((res) => {
            resolve(res.body.message)
        })
        .catch((err) => {
            console.log(err)
            reject(res.body.message)
        })
    } catch (error) {
        console.log(error)
        reject()
    }
})