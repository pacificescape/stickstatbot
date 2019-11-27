const got = require('got')
const parseStats = require('./parseStats')

module.exports = async (message) => {
    try {
        let stats = parseStats(message)
        got.post(`http://localhost:3000/setStats:${stats.type}`, {
            body: stats,
            json: true
        })
        .then()
        .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

}