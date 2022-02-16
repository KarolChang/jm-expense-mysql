const express = require('express')
const router = express.Router()

const db = require('../../models')
const Log = db.Log
const Record = db.Record

// read
router.get('/all', async (req, res, next) => {
  try {
    const logs = await Log.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: Record, as: 'Records' },
        { model: User, as: 'User' }
      ]
    })
    return res.json({ status: 'success', data: logs })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
