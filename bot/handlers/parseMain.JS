module.exports = (text) => {
    let day = text.match(/\d{2,2}\/\d{2,2}\/\d{4,4}/g)[0]

    text = text.split(/\n/)

    stats = {
        day: Date.parse(day),
        total_usage: +text[10].match(/\d+/)[0],
        total_installed: +text[11].match(/\d+/)[0],
        total_removed: +text[12].match(/\d+/)[0]
    }

    console.log(stats)
    return stats
}
// доделать обработку двух дней из /packstats