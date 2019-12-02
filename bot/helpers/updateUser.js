module.exports = (ctx) => new Promise(async (resolve, reject) => {
  let user

  if (!ctx.session.userInfo) user = await ctx.db.User.findOne({ telegram_id: ctx.from.id }).catch(reject)
  else user = ctx.session.userInfo

  const now = Math.floor(new Date().getTime() / 1000)

  if (!user) {
    user = new ctx.db.User()
    user.telegram_id = ctx.from.id
    user.first_act = now
  }
  user.first_name = ctx.from.first_name
  user.last_name = ctx.from.last_name
  user.username = ctx.from.username

  if (!user.updatedAt) user.updatedAt = 0

  const updateInterval = 60 * 1000

  if ((user.updatedAt.getTime() + updateInterval) < Date.now()) {
    user.updatedAt = new Date()
  }

  resolve(user)
})
