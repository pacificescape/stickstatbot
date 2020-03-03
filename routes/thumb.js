const fs = require('fs')
const path = require('path')
const dir = path.resolve(__dirname, '../thumbs/')
const storeThumb = require('../bot/handlers/storeThumb')

module.exports = (ctx) => {
  return new Promise(async (resolve) => {
    const { fileId } = ctx.params
    console.log(path.resolve(dir, `${fileId}.png`))

    ctx.assert(fileId, 400, 'fileId empty')

    let buffer = []
    const fileStream = await fs.createReadStream(path.resolve(dir, `${fileId}.png`))
    fileStream.on('error', error => {
      storeThumb(fileId)
      console.log(error)
    })

    fileStream.on('data', (data) => {
      buffer.push(data)
    })

    fileStream.on('end', async () => {
      buffer = Buffer.concat(buffer)
      ctx.body = buffer
      resolve()
    })
  })
}
