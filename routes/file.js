const mime = require('mime')
const got = require('got')
const {
  convert,
  getFile
} = require('../utils')

module.exports = (ctx) => {
  return new Promise(async (resolve, reject) => {
    const { fileId } = ctx.params

    ctx.assert(fileId, 400, 'fileId empty')

    const file = await getFile(fileId)

    if (file.error) {
      ctx.throw(400, 'Bad Request: Telegram error', {
        description: file.error.description
      })
    }

    let buffer = []

    const fileStream = got.get(file.link, {
      stream: true
    })

    fileStream.on('data', (data) => {
      buffer.push(data)
    })

    fileStream.on('end', async () => {
      buffer = Buffer.concat(buffer)
      ctx.body = await convert(buffer)
      resolve()
    })

    ctx.response.set('cache-control', 'public, max-age=31536000')
    ctx.response.set('content-type', mime.getType(file.fileInfo.file_path))
  })
}
