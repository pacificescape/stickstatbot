const sharp = require('sharp')

module.exports = async (webpBuffer) => {
  // let stream = fs.createWriteStream('png.png')
  // let buffers = []

  const bufferPng = await sharp(webpBuffer)
    .png()
    .toBuffer()

  // stream.on('data', (data) => {
  //   // console.log(data)
  //   buffers.push(data)
  // })
  // stream.on('end', () => {
  //   console.log('stream end')
  //   resolve(Buffer.concat(buffers))
  // })

  return bufferPng
}
