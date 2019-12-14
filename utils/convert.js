const sharp = require('sharp')

module.exports = async (webpBuffer) => {
  const bufferPng = await sharp(webpBuffer)
    .png()
    .toBuffer()

  return bufferPng
}
