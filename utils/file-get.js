const { Telegram } = require('telegraf')
const LRU = require('lru-cache')

const tg = new Telegram(process.env.BOT_TOKEN)
const fileInfos = new LRU({ max: 1000 })
const fileLinks = new LRU({ max: 1000, maxAge: 1000 * 60 * 45 })

module.exports = async (fileId) => {
  const fileInfo = fileInfos.get(fileId) || await tg.getFile(fileId).catch(() => null)

  if (!fileInfo) return { error: true }
  fileInfos.set(fileId, fileInfo)

  const link = fileLinks.get(fileId) || await tg.getFileLink(fileInfo)

  if (!link) return { error: true }
  fileLinks.set(fileId, link)

  return {
    fileInfo,
    link
  }
}
