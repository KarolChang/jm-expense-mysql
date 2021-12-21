const express = require('express')
const router = express.Router()

const db = require('../../models')
const Record = db.Record
const Log = db.Log

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
    if (recordsClosedNow.length) {
      await Log.create({
        recorder: req.body.recorder,
        action: '結算',
        closeAmount: req.body.totalAmount,
        RecordIds: req.body.records
      })
    }
    return res.json({ message: 'close success', recordsClosedNow, recordsNotFound, recordsClosedBefore })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
