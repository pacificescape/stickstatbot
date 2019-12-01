module.exports = async (ctx) => {
  try {
    let result = await ctx.state.db.Task.findOne({ description: ctx.props.text })
    if (!result) {
      const a = new ctx.state.db.Task()
      a.description = ctx.props.text
      a.save()
    }
    ctx.body = result
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.body = 'Internal error'
  }
}
