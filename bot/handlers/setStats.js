const got = require('got')
const parseStats = require('./parseStats')

module.exports = async (message) => {
    try {
        let stats = parseStats(message)
        stats = {...stats, forward_date: message.forward_date, date: message.date, telegram_id: message.from.id}
        got.post(`http://localhost:3000/setStats`, {
            body: stats,
            json: true
        })
        .then()
        .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
}
