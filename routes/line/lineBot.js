const express = require('express')
const router = express.Router()
const lineBot = require('@line/bot-sdk')
const Client = lineBot.Client
const handleMsg = require('./utils/message')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}
const client = new Client(config)

router.post('/', async (req, res) => {
  console.log('req.body.events!!!', req.body.events)
  const event = req.body.events[0]
  try {
    await handleMsg.link(client, event)
    await handleMsg.linked(client, event)
    await handleMsg.unlinked(client, event)
  } catch (err) {
    console.log('[ERROR ROUTE]', err)
    res.status(500).end()
  }
})

module.exports = router
