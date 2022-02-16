const express = require('express')
const router = express.Router()

const db = require('../../models')
const Record = db.Record
const Log = db.Log
const LogItem = db.LogItem

// close
router.put('/', async (req, res, next) => {
  try {
    const { records, totalAmount, UserId } = req.body
    const recordsArr = records.split(',')
    const recordsNotFound = []
    const recordsClosedBefore = []
    const recordsClosedNow = []
    for (let recordId of recordsArr) {
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
      const log = await Log.create({
        UserId,
        action: '結算',
        closeAmount: totalAmount,
        RecordIds: recordsClosedNow.join(',')
      })
      for(let recordId of recordsClosedNow) {
        await LogItem.create({ RecordId: recordId, LogId: log.id })
      }
    }
    return res.json({ status: 'success', data: { recordsClosedNow, recordsNotFound, recordsClosedBefore } })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
