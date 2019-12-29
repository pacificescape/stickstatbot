module.exports = async (ctx) => {
  let result = ctx.session.user.stickerpacks.map(async (name) => {
    let pack = await ctx.state.db.Pack.findOne({ name })

    return {
      title: pack.title,
      main: pack.main,
      name: pack.name,
      thumb: pack.thumb,
      total: pack.total
    }
  })

  result = await Promise.all(result)
  ctx.body = result
}
