const { getFile } = require('../../utils')

module.exports = async (ctx) => { // дописать кеш с ттл, вывод по 10 результатов
  let result = await ctx.state.db.Pack.find()
  // .sort({ 'main.total_installed': -1 })
  result = result.map(async pack => {
    let thumb = await getFile(pack.thumb)
    return {
      title: pack.title,
      main: pack.main,
      name: pack.name,
      thumb
    }
  })
  result = await Promise.all(result)
  ctx.body = result
}
