module.exports = async (ctx) => {
  let result = await ctx.state.db.Task.findOne({ description: ctx.props.text })

  if (!result) {
    result = new ctx.state.db.Task()

    result.description = ctx.props.text
    result.save()
  }
  ctx.result = result
}
