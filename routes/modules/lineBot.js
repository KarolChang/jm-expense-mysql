const express = require('express')
const router = express.Router()
const axios = require('axios')

// push messages
router.post('/push', async (req, res, next) => {
  try {
    const lineBotURL = 'http://linebot20220114.herokuapp.com'
    const apiHelperLineBot = axios.create({
      baseURL: lineBotURL
    })
    console.log('req.body', req.body)
    await apiHelperLineBot.post('/push', req.body)
    return res.json({ status: 'success', data: req.body })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
