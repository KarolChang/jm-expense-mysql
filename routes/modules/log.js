const express = require('express')
const router = express.Router()

const db = require('../../models')
const Log = db.Log

// read
router.get('/all', async (req, res, next) => {
  try {
    const logs = await Log.findAll({
      order: [['createdAt', 'DESC']]
    })
    return res.json({ status: 'success', data: logs })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
