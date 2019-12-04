module.exports = (text) => {
  let day = text.match(/\d{2,2}\/\d{2,2}\/\d{4,4}/g)[0]

  text = text.split(/\n/)

  const stats = {
    date: Date.parse(day),
    usage: +text[2].match(/\d+/)[0],
    installed: +text[3].match(/\d+/)[0],
    removed: +text[4].match(/\d+/)[0]
  }

  console.log(stats)
  return stats
}
// отправляю статистику на сервер, day преобразовать через Date(day), сделать результаты числовыми
// 2: "Usage: 0"
// 3: "Installed: 0"
// 4: "Removed: 0"
