const express = require('express')
const router = express.Router()
const axios = require('axios')

// create
router.post('/send', async (req, res, next) => {
  try {
    const { msg } = req.body
    axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAAUW3I2V0:APA91bGfqcjgi5h8M7oYLWW9rKTpLKCML9uAb1uhXTfAQaREPva-nM-NszxgNDrMCFr3PHeAD2Kik4jQ-zC7FnKWrsi77ycd2q_DQ3Ce2T5Xrlmughfh1lmdqoCUNU20d2klopjglXSy'
      },
      data: {
        to: '/topics/jmka',
        notification: {
          title: '卡羅記帳',
          body: msg
        }
      }
    })
    return res.json({ status: 'success' })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
