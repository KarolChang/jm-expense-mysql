const express = require('express')
const router = express.Router()

const db = require('../../models')
const Record = db.Record

// close
router.put('/', async (req, res, next) => {
  try {
    // req.body: records
    const records = req.body.records.split(',')
    const recordsNotFound = []
    const recordsClosedBefore = []
    const recordsClosedNow = []
    for (let recordId of records) {
      const record = await Record.findByPk(Number(recordId))
      if (!record) {
        recordsNotFound.push(Number(recordId))
      } else if (record.isClosed === true) {
        recordsClosedBefore.push(Number(recordId))
      } else {
        recordsClosedNow.push(Number(recordId))
        await record.update({ isClosed: true })
      }
    }
    return res.json({ message: 'close success', recordsClosedNow, recordsNotFound, recordsClosedBefore })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
