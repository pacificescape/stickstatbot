const { createHash, createHmac } = require('crypto')

function checkSignature ({ hash, ...data }) {
  const secret = createHash('sha256')
    .update(process.env.BOT_TOKEN)
    .digest()
  const checkString = Object.keys(data)
    .sort()
    .map((k) => `${k}=${data[k]}`)
    .join('\n')
  const hmac = createHmac('sha256', secret)
    .update(checkString)
    .digest('hex')

  return hmac === hash
}

module.exports = async (ctx) => {
  let userId = ''

  if (ctx.request.query.user_id) {
    userId = ctx.request.query.user_id
    delete ctx.request.query.user_id
  }

  if (!checkSignature(ctx.request.query)) {
    ctx.session.destroy()
    return ctx.res.send(400, 'error')
  }

  ctx.session.user = await ctx.state.db.User.findOne({
    telegram_id: ctx.request.query.id
  })

  if (userId) ctx.redirect(`/mypacks/${userId}`)
  return ctx.redirect('/')
}
