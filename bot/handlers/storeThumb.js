const fs = require('fs')
const path = require('path')
const got = require('got')
const {
  convert,
  getFile
} = require('../../utils')
const dir = path.resolve(__dirname, '../../thumbs/')

module.exports = async (fileId, ctx, resolve) => {
  console.log(`${dir + '/' + fileId}.png`)
  try {
    fs.accessSync(dir, fs.constants.F_OK)
  } catch (error) {
    fs.mkdir(dir, { recursive: true }, (error) => {
      if (error) throw error
    })
    console.log('no dir')
  }

  const file = await getFile(fileId)

  if (file.error) {
    console.log(400, 'Bad Request: Telegram error', {
      description: file.error.description
    })
  }

  let buffer = []
  let png = ''

  const fileStream = got.get(file.link, {
    stream: true
  })

  fileStream.on('data', (data) => {
    buffer.push(data)
  })

  fileStream.on('end', async () => {
    buffer = Buffer.concat(buffer)
    png = await convert(buffer)
    fs.appendFile(`${dir + '/' + fileId}.png`, png, (err) => {
      if (err) throw err
      console.log('The "data to append" was appended to file!')
    })
    ctx.body = png
    resolve()
  })
}
