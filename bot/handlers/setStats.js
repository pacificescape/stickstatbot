const got = require('got')
const parseStats = require('./parseStats')

module.exports = async (ctx) => {
  let { message } = ctx
  try {
    let stats = await parseStats(ctx)
    stats = { ...stats, forward_date: message.forward_date, date: message.date, telegram_id: message.from.id }
    return got.post(`http://localhost:3000/setStats`, {
      body: { message, stats },
      json: true
    })
      .catch(error => console.log(error))
  } catch (error) {
    console.log(error)
  }
}
