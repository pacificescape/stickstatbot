const Markup = require('telegraf/markup')

module.exports = async (ctx) => {
  let loginUrl = process.env.WEB_URL

  loginUrl += `?user_id=${ctx.chat.id}`

  ctx.reply('web', {
    reply_markup: Markup.inlineKeyboard([
      Markup.loginButton('Login', loginUrl, {
        request_write_access: true
      })
    ])
  })
}
