const parseType = require('./parseType')
const parseMain = require('./parseMain')

module.exports = parseStats = async (ctx) => {
  let { entities, text } = ctx.message
  let name = entities[0].url.split('/')[4]
  let type = text.match(/ for \d{2,2}\/\d{2,2}\/\d{4,4}/g) ? 'day'
    : text.match(/ for \d{2,2}\/\d{4,4}/g) ? 'month'
      : text.match(/ for \d{4,4}/g) ? 'year' : 'main'

  let stickers = await ctx.getStickerSet(name)

  switch (type) {
    case 'main':
      stats = parseMain(text)
      break
    case 'day':
    case 'month':
    case 'year':
      stats = parseType(text)
      break
    default:
      console.log('type is invalid')
  }

  stats = { ...stats, type, stickers, name }
  return stats
}

// в модели преобразовать время в строку. и/или хранить тип
