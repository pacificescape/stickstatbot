const Router = require('koa-router')
const router = new Router()
const Task = require('../api/Task')

router.post('/addTask', async (ctx) => {
    try {
        let result = await Task.addTask({...ctx.request.body})
        ctx.body = result
    } catch (error) {
        console.log(error)
        ctx.status = 500
        ctx.body = 'Internal error'
    }
})

router.post('/newUser', async (ctx) => {
    try {
        // заносим User в Users
        ctx.status = 200
        ctx.body = {message: 'New User added'}
    } catch (error) {
        console.log(error)
        ctx.status = 400
        ctx.body = {message: 'Internal error'}
    }
})

router.get('/getTasks', async (ctx) => {
    try {
        let result = await Task.getTasks()
        ctx.body = result
    } catch (error) {
        console.log(error)
        ctx.status = 500
        ctx.body = 'Internal error'
    }
})

router.get('/', async (ctx) => {
    ctx.body = 'Its works'
})

module.exports = router;