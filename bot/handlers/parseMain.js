module.exports = (text) => {
  text = text.split(/\n/)

  const stats = {
    date: Date.now(),
    total_usage: +text[10].match(/\d+/)[0],
    total_installed: +text[11].match(/\d+/)[0],
    total_removed: +text[12].match(/\d+/)[0]
  }

  return stats
}
//  доделать обработку "вчера" и "сегодня" из /packstats
