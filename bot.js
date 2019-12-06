const Telegraf = require('telegraf')
const session = require('telegraf/session')
const bot = new Telegraf(process.env.BOT_TOKEN)
const {
  db
} = require('./database')
const {
  setStats,
  parseStats
} = require('./bot/handlers')

const {
  checkForward
} = require('./bot/utils')

const {
  updateUser
} = require('./bot/helpers')

bot.context.db = db

bot.use(session({ ttl: 60 * 5 }))

bot.command('web', (ctx) => ctx.reply('http://localhost:3000/')) // старница со стикерпаками
bot.command('help', (ctx) => ctx.reply('перешлите мне сообщения со статистикой от бота'))

bot.use(checkForward)
bot.use(parseStats)
bot.use(updateUser)

bot.on('message', setStats)

// await setStats(ctx)
//   .then((res) => {
//     res.body.ok ? ctx.reply('Статистика успешно добалена!')
//       : ctx.reply('server res:' + res.body.message)
//   })
// let pack = await ctx.getStickerSet('fkey123')
// console.log(pack)
// })

bot.start(ctx => ctx.reply('Welcome'))
bot.catch((err) => console.log(`Ooops, ecountered an error `, err))
bot.launch()
  .then(() => console.log('bot started'))

// проверять добавлена ли главная статистика packstatsю без нее не давать делать ничего
// проверять не только ттл но и совпадения числа
// scene для получения топа стикеров в паке. качать файл для отображения. создать коллекцию с file_id. модуль получения файла по айди.
// getStickerSet -> StickerSet object is returned.
