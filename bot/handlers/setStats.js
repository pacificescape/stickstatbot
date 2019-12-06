module.exports = async (ctx, next) => {
  let data = ctx.state.data
  let pack
  ctx.session.packInfo = ctx.session.packInfo || {}

  if (!ctx.session.packInfo[data.name]) pack = await ctx.db.Pack.findOne({ name: data.name })
  else pack = ctx.session.packInfo[data.name]

  if (!pack) {
    pack = new ctx.db.Pack()
    // pack.day pack.month pack.year = []
    pack.thumb = data.stickers.stickers[0].thumb
    pack.owner = ctx.session.userInfo
    pack.name = data.name
    pack.title = data.stickers.title
    pack.size = data.stickers.stickers.length
    pack.stickers = data.stickers.stickers
    pack.is_animated = data.stickers.stickers.is_animated
    pack.contains_masks = data.stickers.stickers.contains_masks
  }

  if (data.type === 'main') Object.assign(pack[data.type], data.stats)
  else pack[data.type].push(data.stats)
  pack.size = data.stickers.stickers.length
  pack.thumb = data.stickers.stickers[0].thumb.file_id

  await pack.save().catch((err) => console.log(err))

  if (!ctx.session.stickersInfo) ctx.session.stickersInfo = data.stickers

  ctx.session.packInfo[pack.name] = pack
}
