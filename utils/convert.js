const ffmpeg = require('./ffmpeg')
const fs = require('fs')

module.exports = (picture) => {
  return new Promise((resolve, reject) => {
    let stream = fs.createWriteStream('png.png')
    let buffers = []
    ffmpeg(picture)
      .format('png')
      .on('error', function (err) {
        console.log('An error occurred: ' + err.message)
        reject(err)
      })
      .on('end', function () {
        console.log(`Finished ...`)
      })
      .pipe()

    stream.on('data', (data) => {
      // console.log(data)
      buffers.push(data)
    })
    stream.on('end', () => {
      console.log('stream end')
      resolve(Buffer.concat(buffers))
    })
  })
}
