const storeThumb = require('./storeThumb')

module.exports = async (ctx) => {
  const allPacks = await ctx.db.Pack.find()

  allPacks.map((pack) => {
    storeThumb(pack.thumb)
  })
}
