module.exports = async (ctx) => { // дописать кеш с ттл, сортировка на сервере монги, вывод по 10 результатов
  let result = await ctx.state.db.Pack.find()
    .sort({ 'main.total_installed': -1 })

  ctx.body = result
  // .sort((a, b) => {
  //   return b.main.total_usage - a.main.total_usage
  // })
}
