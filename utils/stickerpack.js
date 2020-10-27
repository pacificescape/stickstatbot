const { Telegram } = require('telegraf')
const LRU = require('lru-cache')

const tg = new Telegram(process.env.BOT_TOKEN)
const packInfos = new LRU({ max: 1000 })

module.exports = async (packName) => {
  const packInfo = packInfos.get(packName) || await tg.getStickerSet(packName).catch(() => null)

  if (!packInfo) return { error: true }
  packInfos.set(packName, packInfo)

  return packInfo
}
