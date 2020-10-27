module.exports = async (ctx) => {
  let user = await ctx.db.User.findOne({ telegram_id: ctx.chat.id })
  if (!user) return ctx.reply('Сначала добавьте стикерпак')

  for (const pack of user.stickerpacks) {
    await ctx.reply('/packstats')
    await ctx.reply(pack)
  }
}
