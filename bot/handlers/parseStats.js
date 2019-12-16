const parseType = require('./parseType')
const parseMain = require('./parseMain')
const LRU = require('lru-cache')

const packInfos = new LRU({ max: 1000 })

module.exports = async (ctx, next) => {
  let { entities, text } = ctx.message
  let name = entities[0].url.split('/')[4]
  let type = text.match(/ for \d{2,2}\/\d{2,2}\/\d{4,4}/g) ? 'day'
    : text.match(/ for \d{2,2}\/\d{4,4}/g) ? 'month'
      : text.match(/ for \d{4,4}/g) ? 'year' : 'total'

  const stickers = packInfos.get(name) || await ctx.getStickerSet(name).catch(() => null)
  let stats = {}

  if (!stickers) return { error: true }
  packInfos.set(name, stickers)

  switch (type) {
    case 'total':
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

  ctx.state.data = { stats, type, stickers, name }
  next()
}

// в модели преобразовать время в строку. и/или хранить тип
