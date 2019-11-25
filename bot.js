const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const { newUser } = require('./bot/handlers')

bot.start((ctx => ctx.reply('Welcome')))

bot.use((ctx, next) => {
    if (!ctx.message.forward_from || ctx.message.forward_from.id != 429000) {
        ctx.reply('Перешлите сообщение со статистикой стикерпака от @Stickers (команда /packstats)')
    } else next()
})

bot.use((ctx) => {
    newUser(ctx.message)
    // .then((msg) => ctx.reply(msg))
    .catch((err) => console.log(err))
})

bot.on('message', (ctx) => {
    console.log(ctx.message)
})

bot.catch((err, ctx) => {
  console.log(`Ooops, ecountered an error `, err)
})

bot.launch()


