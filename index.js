require('dotenv').config()

const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body')
const router = require('./router')

require('./db')
require('./bot.js')

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);