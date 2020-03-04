const sharp = require('sharp')

module.exports = async (webpBuffer) => {
  const bufferPng = await sharp(webpBuffer)
    .png({
      quality: 95
    })
    .resize(150, 150, {
      fit: 'inside'
    })
    .toBuffer()
    .catch(error => console.log(error))

  return bufferPng
}
