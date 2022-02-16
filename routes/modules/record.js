const express = require('express')
const router = express.Router()

const db = require('../../models')
const Record = db.Record
const Log = db.Log
const LogItem = db.LogItem

// create
router.post('/create', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const { date, item, merchant, amount, UserId } = req.body
    const record = await Record.create({ date, item, merchant, amount, UserId })
    const log = await Log.create({ date, item, merchant, amount, UserId, action: '新增', RecordId: record.id })
    await LogItem.create({ RecordId: record.id, LogId: log.id })
    return res.json({ status: 'success', data: record })
  } catch (err) {
    return next(err)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const records = await Record.findAll({
      order: [['date', 'DESC']],
      include: [{ model: User, as: 'User' }]
    })
    return res.json({ status: 'success', data: records })
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id)
    if (!record) {
      return res.json({ status: 'error', message: 'record is not existed' })
    }
    return res.json({ status: 'success', data: record })
  } catch (err) {
    return next(err)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id)
    if (!record) {
      return res.json({ status: 'error', message: 'record is not existed' })
    }
    const oldRecord = {
      itemBefore: record.item,
      merchantBefore: record.merchant,
      amountBefore: record.amount,
      dateBefore: record.date
    }
    const { date, item, merchant, amount, UserId } = req.body
    const updatedRecord = await record.update(req.body)
    const log = await Log.create({
      date,
      item,
      merchant,
      amount,
      UserId,
      action: '編輯',
      ...oldRecord,
      RecordId: req.params.id
    })
    await LogItem.create({ RecordId: req.params.id, LogId: log.id })
    return res.json({ status: 'success', data: updatedRecord })
  } catch (err) {
    return next(err)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id)
    if (!record) {
      return res.json({ status: 'error', message: 'record is not existed' })
    }
    const deletedRecord = await record.destroy()
    return res.json({ status: 'success', data: deletedRecord })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
