const express = require('express')
const router = express.Router()
const axios = require('axios')

// push message
// router.post('/push', async (req, res, next) => {
//   try {
//     const lineBotURL = 'https://api.line.me/v2/bot/message/multicast'
//     const apiHelperLineBot = axios.create({
//       baseURL: lineBotURL
//     })
//     apiHelperLineBot.defaults.headers.post['Content-Type'] = 'application/json'
//     apiHelperLineBot.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.CHANNEL_ACCESS_TOKEN
//     await apiHelperLineBot.post('/', req.body)
//     return res.json({ message: 'line message push success', input: req.body })
//   } catch (error) {
//     return next(error)
//   }
// })

router.post('/push', async (req, res, next) => {
  try {
    const lineBotURL = 'https://linebot20220114.herokuapp.com'
    const apiHelperLineBot = axios.create({
      baseURL: lineBotURL
    })
    await apiHelperLineBot.post('/push', req.body)
    return res.json({ message: 'line message push success', input: req.body })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
