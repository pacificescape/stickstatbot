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
  if (!checkSignature(ctx.props)) {
    ctx.session = null
    ctx.throw(400, 'Bad Request: HASH_INVALID')
  }

  ctx.session.user = ctx.props

  ctx.result = ctx.props
}
