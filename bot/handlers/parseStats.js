const {
    parseDay,
    parseMonth,
    parseYear,
    parseMain
} = require('./parsers')

module.exports = parseStats = ({text, entities}, getStickerSet) => {
    let name = entities[0].url.split('/')[4]
    // let stickerSet = await getStickerSet(name) // убрать запрос, сделать проверку наличия пака
    let type = text.match(/ for \d{2,2}\/\d{2,2}\/\d{4,4}/g) ? 'day'
        : text.match(/ for \d{2,2}\/\d{4,4}/g) ? 'month'
         : text.match(/ for \d{4,4}/g) ? 'year' : 'main'
    
    switch (type) {
        case 'day':
            stats = parseDay(text) // деструктивное присваивание
            break;
        case 'month':
            // parseMonth(text.split(/\n/))
            keys = []
            break;
        case 'year':
            // parseYear(text.split(/\n/))
            keys = []
            break;
        case 'main':
            // parseMain(text.split(/\n/))
            keys = []
            break;
        default:
            console.log('type is invalid')
    }

    return stats = {...stats, type}
}
