const Router = require('koa-router')
const router = new Router()
const { Task, newUser } = require('../api')

router.post('/addTask', async (ctx) => {
    try {
        let result = await Task.addTask({ ...ctx.request.body })
        ctx.body = result
    } catch (error) {
        console.log(error)
        ctx.status = 500
        ctx.body = 'Internal error'
    }
})

router.post('/newUser', async (ctx) => { // перенести в middleware
    try {
        // заносим User в Users
        await newUser.checkUser(ctx.request.body.id)
        .then(async (res) => {
            if (!res.success) {
                await newUser.newUser(ctx.request.body)
                    .then((ress) => ress.success ? ctx.body = { message: 'New User added' } : ctx.body = { message: 'Internal error' })
            } else {
                ctx.status = 200
                ctx.body = {}
            }
        })  
    } catch (error) {
        console.log(error)
        ctx.status = 400
        ctx.body = { message: 'Internal error' }
    }
})

router.post('/checkUser', async (ctx) => {
    try {
        // заносим User в Users

        ctx.status = 200
        ctx.body = { message: 'New User added' }
    } catch (error) {
        console.log(error)
        ctx.status = 400
        ctx.body = { message: 'Internal error' }
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