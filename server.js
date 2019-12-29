require('dotenv').config()

const Router = require('koa-router')
const logger = require('koa-logger')
const responseTime = require('koa-response-time')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const Koa = require('koa')
const app = new Koa()

require('./bot.js')

app.keys = [process.env.SESSION_SECRET]
// app.use(cors())
app.use(logger())
app.use(responseTime())
app.use(bodyParser())
app.use(require('./helpers').helpersApi)

app.use(session(app))

const {
  db
} = require('./database')

// const Redis = require('ioredis')
// const redis = new Redis({ keyPrefix: `${process.env.REDIS_PREFIX}:` })

const { Telegram } = require('telegraf')
const telegram = new Telegram(process.env.BOT_TOKEN)

app.use(async (ctx, next) => {
  ctx.state.db = db
  // ctx.state.redis = redis
  ctx.state.tg = telegram

  await next()
})

const route = new Router()

const {
  routeLogin,
  routeFile,
  routeApi
} = require('./routes')

route.get('/login', routeLogin)
route.use('/api', routeApi.routes())
route.get('/file/:fileId', routeFile)

app.use(route.routes())
// app.use(route.allowedMethods())

db.connection.once('open', () => {
  console.log('Connected to MongoDB')

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log('Listening on localhost, port', port)
  })
})
