const Telegraf = require('telegraf')
const session = require('telegraf/session')
const bot = new Telegraf(process.env.BOT_TOKEN)
const {
  db
} = require('./bot/database')
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

bot.use((ctx, next) => {
  checkForward(ctx, next)
})

bot.use(async (ctx, next) => {
  await parseStats(ctx, next)
})
bot.use(async (ctx, next) => {
  ctx.session.userInfo = await updateUser(ctx)
  next()
})

bot.on('message', setStats)
// await setStats(ctx)
//   .then((res) => {
//     res.body.ok ? ctx.reply('Статистика успешно добалена!')
//       : ctx.reply('server res:' + res.body.message)
//   })
// let pack = await ctx.getStickerSet('fkey123')
// console.log(pack)
// })

bot.command('help', (ctx) => ctx.reply('перешлите мне сообщения со статистикой от бота'))

bot.start(ctx => ctx.reply('Welcome'))
bot.catch((err) => console.log(`Ooops, ecountered an error `, err))
bot.launch()
  .then(() => console.log('bot started'))

// проверять добавлена ли главная статистика packstatsю без нее не давать делать ничего
// проверять не только ттл но и совпадения числа
// scene для получения топа стикеров в паке. качать файл для отображения. создать коллекцию с file_id. модуль получения файла по айди.
// getStickerSet -> StickerSet object is returned.
