const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const {
    checkUser,
    checkForward,
    setStats
} = require('./bot/handlers')


// bot.use((ctx, next) => {
//     parseStats(ctx.message)
//     .then((res) => {
//         console.log(res)
//     })
// })

bot.use((ctx, next) => {
    if (!ctx.message.forward_from || ctx.message.forward_from.id != 429000) {
        ctx.reply('Перешлите сообщение со статистикой стикерпака от @Stickers (команда /packstats)')
    } else next()
})

bot.use((ctx, next) => {
    checkForward(ctx.message) ? next() : ctx.reply('forwarded data is too old. you have only 5 minutes to forward stata')
})

bot.use((ctx, next) => {
    console.log(ctx.message)
    checkUser(ctx.message)
    // .then((msg) => ctx.reply(msg))
    .catch((err) => console.log(err))
    next()
})

bot.on('message', (ctx) => {
    setStats(ctx.message)
})

bot.command('help', (ctx) => ctx.reply('перешлите мне сообщения со статистикой от бота'))

bot.start((ctx => ctx.reply('Welcome')))
bot.catch((err) => console.log(`Ooops, ecountered an error `, err))
bot.launch() 
.then(() => console.log('bot started'))









// проверять не только ттл но и совпадения числа
// scene для получения топа стикеров в паке. качать файл для отображения. создать коллекцию с file_id. модуль получения файла по айди. 
// getStickerSet -> StickerSet object is returned.