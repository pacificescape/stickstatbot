const parseType = require('./parseType')
const parseMain = require('./parseMain')


module.exports = parseStats = ({ text, entities }) => {
    // let name = entities[0].url.split('/')[4] беру имя пака из урла
    let type = text.match(/ for \d{2,2}\/\d{2,2}\/\d{4,4}/g) ? 'day'
        : text.match(/ for \d{2,2}\/\d{4,4}/g) ? 'month'
            : text.match(/ for \d{4,4}/g) ? 'year' : 'main'

    switch (type) {
        case 'main':
                stats = parseMain(text)
            break;
        case 'day':
        case 'month':
        case 'year':
            stats = parseType(text)
            break;
        default:
            console.log('type is invalid')
    }

    return stats = { ...stats, type }
}


// в модели преобразовать время в строку. и/или хранить тип