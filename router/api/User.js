const { User } = require('../../database/models')

// exports.newUser = (stats) => new Promise(async (resolve, reject) => {
//     try {
//         let user = await User.find({ telegram_id: stats.id })
//         if (user.length) resolve({ success: true, user })

//         if (!stats) {
//             resolve({
//                 success: false,
//                 message: 'user is required'
//             })
//         }

//         let { telegram_id = stats.id, first_name, username } = stats
//         const newUser = new User({
//             telegram_id,
//             first_name,
//             username
//         })

//         user = await newUser.save()

//         resolve({
//             success: true,
//             user
//         })
//     } catch (error) {
//         reject(error)
//     }
// })

// создаёт и обновляет пользователя

exports.checkUser = (message) => new Promise(async (resolve, reject) => {
  let {
    chat: {
      id: telegram_id,
      first_name = '',
      last_name = '',
      username = ''
    } = {},
    entities: {
      0: {
        url
      }
    } = {}
  } = message
  let userMsg = { telegram_id, first_name, last_name, username, stickerpacks: [url] }
  try {
    let user = await User.findOne({ telegram_id })
    if (!user) {
      user = new User(userMsg)
      user.save()
        .then(() => resolve(user))
    }

    if (user && !user.stickerpacks.includes(url)) user.stickerpacks.push(url)

    await user.updateOne({
      first_name,
      last_name,
      username,
      stickerpacks: user.stickerpacks
    })

    resolve(user)
  } catch (error) {
    reject(error)
  }
})
