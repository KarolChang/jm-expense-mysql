const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const lineBot = require('@line/bot-sdk')
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(
  '/callback',
  lineBot.middleware({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

// route
app.get('/', (req, res) => {
  res.send('JM Expense')
})

// error message
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ status: 'error', message: String(err) })
    return next(err)
  }
})

app.use(history()).listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})
