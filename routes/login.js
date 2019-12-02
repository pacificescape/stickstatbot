const { createHash, createHmac } = require('crypto')


function checkSignature({ hash, ...data }) {
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
  let groupId = ''

  if (req.query.group_id) {
    groupId = req.query.group_id
    delete req.query.group_id
  }

  if (!checkSignature(req.query)) {
    req.session.destroy()
    return res.send(400, 'error')
  }

  req.session.user = await req.context.db.User.findOne({
    telegram_id: req.query.id,
  })

  if (groupId) res.redirect(`/group/${groupId}`)
  return res.redirect('/')
}