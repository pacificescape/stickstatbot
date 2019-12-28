module.exports = async (ctx) => { // дописать кеш с ттл, вывод по 10 результатов
  let result = await ctx.state.db.Pack.find()
    .sort({ 'main.total_usage': -1 }) // нужно будет для подгрузки
  result = result.map(pack => {
    return {
      title: pack.title,
      main: pack.main,
      name: pack.name,
      thumb: pack.thumb,
      total: pack.total
    }
  })
  // result = await Promise.all(result)
  ctx.body = result
}
