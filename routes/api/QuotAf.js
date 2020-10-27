module.exports = async (ctx) => { // дописать кеш с ттл, вывод по 10 результатов
  let result = await ctx.state.db.Stats.find()
    .sort({ 'date': -1 })
    .lean() // нужно будет для подгрузки
  result = result.map(day => {
    return {
      stickers: day.stickers,
      packs: day.packs,
      inline: day.inline,
      private: day.private,
      users: day.users,
      generated: day.generated,
      latency: day.latency
    }
  })
  // result = await Promise.all(result)
  ctx.body = result
}
