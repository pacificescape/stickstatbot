const Router = require('koa-router')
const api = new Router()

api
  .get('/addTask', require('./add-task'))
  .post('/addTask', require('./add-task'))

api
  .get('/setStats', () => console.log('setStats'))
  .post('/setStats', () => console.log('setStats'))

api
  .get('/getTop', require('./getTop'))
  .post('/getTop', require('./getTop'))

module.exports = api

// router.post('/checkUser', async (ctx) => { // не нужен отдельный метод
//   let message = ctx.request.body
//   try {
//     await User.checkUser(message)
//       .then(async (res) => {
//         if (!res.success) {
//           res.success ? ctx.body = { message: 'New User added' } : ctx.body = { message: 'Internal error' }
//         } else {
//           ctx.status = 200
//           ctx.body = {}
//         }
//       })
//       .catch((error) => console.log(error))
//   } catch (error) {
//     console.log(error)
//     ctx.status = 400
//     ctx.body = { message: 'Internal error' }
//   }
// })

// router.get('/getTasks', async (ctx) => {
//   try {
//     let result = await Task.getTasks()
//     ctx.body = result
//   } catch (error) {
//     console.log(error)
//     ctx.status = 500
//     ctx.body = 'Internal error'
//   }
// })

// router.post('/setStats', async (ctx) => {
//   let { message, stats } = ctx.request.body

//   try {
//     await User.checkUser(message)
//       .then(async user => Stats.setStats(ctx.request.body, user))
//       .then(() => {
//         ctx.status = 200,
//         ctx.body = { ok: true }
//       })
//       .catch((err) => console.log(err))
//   } catch (error) {
//     ctx.status = 500
//     ctx.body = { ok: false, message: error }
//   }
// })

// router.get('/', async (ctx) => {
//   ctx.body = 'Its works'
// })
