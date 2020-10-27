const storeThumb = require('./storeThumb')

module.exports = async (ctx, next) => {
  let data = ctx.state.data
  let pack
  ctx.session.packInfo = ctx.session.packInfo || {}

  if (!ctx.session.packInfo[data.name]) pack = await ctx.db.Pack.findOne({ name: data.name })
  else pack = ctx.session.packInfo[data.name]

  if (!pack) {
    pack = new ctx.db.Pack()
    // pack.day pack.month pack.year = []
    // pack.thumb = data.stickers.stickers[0].thumb
    pack.owner = ctx.session.userInfo
    pack.name = data.name
    pack.title = data.stickers.title
    pack.size = data.stickers.stickers.length
    pack.stickers = data.stickers.stickers
    pack.is_animated = data.stickers.stickers.is_animated
    pack.contains_masks = data.stickers.stickers.contains_masks
  }
  pack.thumb = data.stickers.stickers[0].is_animated
    ? data.stickers.stickers[0].thumb.file_id : data.stickers.stickers[0].file_id
  // pack[data.type][0] && pack[data.type][0].date ?
  //   new Date(pack[data.type][0].date) - new Date(data.stats.date) < 86400000 ?
  //    new Date(pack[data.type][0].date).getDate() === new Date(data.stats.date).getDate() ?
  const StartOfDayMs = (ms) => ms - (ms % (86400 * 1000))

  if (data.type === 'total') pack.main = data.stats
  if (pack[data.type][0] && pack[data.type][0].date) {
    let a = Date.parse(pack[data.type][0].date.toString())
    let b = data.stats.date
    if (StartOfDayMs(a) === StartOfDayMs(b)) {
      pack[data.type].shift()
    }
  }

  pack[data.type].splice(0, 0, data.stats)
  pack.size = data.stickers.stickers.length
  await pack.save()
    .then(() => ctx.reply(`Статистика для '${pack.title}' успешно добавлена`))
    .catch((err) => console.log(err))

  if (!ctx.session.stickersInfo) ctx.session.stickersInfo = data.stickers

  storeThumb(pack.thumb)

  ctx.session.packInfo[pack.name] = pack
}
