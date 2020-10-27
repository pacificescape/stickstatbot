const Telegraf = require('telegraf')
const Scene = require('telegraf/scenes/base')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter, leave } = Stage
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

const setdayHandler = new Composer()

setdayHandler.action('next', (ctx) => {
  ctx.reply('Set data for declare packstats (example: 24.10.2019)')

  return ctx.wizard.next()
})
setdayHandler.command('next', (ctx) => {
  ctx.reply('Step 2. Via command')
  return ctx.wizard.next()
})
setdayHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))

module.exports = setdayHandler

const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.reply('Step 1', Markup.inlineKeyboard([
      Markup.urlButton('❤️', 'http://telegraf.js.org'),
      Markup.callbackButton('➡️ Next', 'next')
    ]).extra())
    return ctx.wizard.next()
  },
  setdayHandler,
  (ctx) => {
    ctx.reply('Step 3')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Step 4')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Done')
    return ctx.scene.leave()
  }
)
