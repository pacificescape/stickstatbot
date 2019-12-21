module.exports = async (ctx) => {
  let user = await ctx.db.User.findOne({ telegram_id: ctx.chat.id })
  if (!user) return ctx.reply('Сначала добавьте стикерпак')

  user.stickerpacks.map((name, i) => {
    setTimeout(() => {
      ctx.reply('/packstats')
        .then(() => ctx.reply(name))
    }, 230 * i)
  })
}
