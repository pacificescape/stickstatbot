module.exports = (ctx, next) => {
  if (!ctx.message.forward_from || ctx.message.forward_from.id !== 429000) {
    ctx.reply('Перешлите сообщение со статистикой стикерпака от @Stickers (команда /packstats)')
    return
  }

  if (ctx.message.date - ctx.message.forward_date >= process.env.FORWARD_TTL) {
    ctx.reply(`Перешлите статистику отправленную менее ${process.env.FORWARD_TTL / 60} минут назад`)
    return
  }
  next()
}
