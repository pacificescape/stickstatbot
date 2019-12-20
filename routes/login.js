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

  if (ctx.query.id) {
    userId = ctx.query.id
    // delete ctx.query.id
  }

  if (!checkSignature(ctx.query)) {
    ctx.session.destroy()
    return ctx.send(400, 'error')
  }

  ctx.session.user = await ctx.state.db.User.findOne({
    telegram_id: ctx.query.id
  })

  if (userId) ctx.redirect(`/mypacks/${userId}`)
  return ctx.redirect('/')
}
