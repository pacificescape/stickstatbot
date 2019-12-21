const Telegraf = require('telegraf')
const session = require('telegraf/session')
const bot = new Telegraf(process.env.BOT_TOKEN)
const {
  db
} = require('./database')
const {
  setStats,
  parseStats,
  webAuth,
  getStats
} = require('./bot/handlers')

const {
  checkForward
} = require('./bot/utils')

const {
  updateUser
} = require('./bot/helpers')

bot.context.db = db

bot.use(session({ ttl: 60 * 5 }))

bot.command('packs', getStats) // старница со стикерпаками
bot.command('web', webAuth) // старница со стикерпаками
bot.command('help', (ctx) => ctx.reply('перешлите мне сообщения со статистикой от бота'))

bot.use(checkForward)
bot.use(parseStats)
bot.use(updateUser)

bot.on('message', setStats)

bot.start(ctx => ctx.reply('Welcome'))
bot.catch((err) => console.log(`Ooops, ecountered an error `, err))
bot.launch()
  .then(() => console.log('bot started'))
