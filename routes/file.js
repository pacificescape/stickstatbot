const got = require('got')
const {
  getFile
} = require('../utils')

module.exports = async (ctx) => {
  const { fileId } = ctx.params

  ctx.assert(fileId, 400, 'fileId empty')

  const file = await getFile(fileId)

  if (file.error) {
    ctx.throw(400, 'Bad Request: Telegram error', {
      description: file.error.description
    })
  }

  const fileStream = got.get(file.link, {
    stream: true
  })

  ctx.response.set('cache-control', 'public, max-age=31536000')
  ctx.response.set('content-type', 'video/mp4')

  ctx.body = fileStream
}
