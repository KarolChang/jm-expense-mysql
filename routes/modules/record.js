const { load } = require('dotenv')
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Record = db.Record
const Log = db.Log

// create
router.post('/create', async (req, res, next) => {
  try {
    // req.body: date, item, merchant, amount, recorder
    console.log('req.body', req.body)
    const record = await Record.create(req.body)
    await Log.create({ ...req.body, action: '新增', RecordId: record.id })
    return res.json({ message: 'create success', record })
  } catch (error) {
    return next(error)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const records = await Record.findAll({
      where: { deletedAt: null },
      order: [['date', 'DESC']]
    })
    // const records = await Record.findAll({ where: { deletedAt: null } })
    return res.json(records)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id)
    if (!record) {
      return res.json({ message: 'record is not existed' })
    }
    return res.json(record)
  } catch (error) {
    return next(error)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id)
    const oldRecord = {
      itemBefore: record.item,
      merchantBefore: record.merchant,
      amountBefore: record.amount,
      dateBefore: record.date
    }
    if (!record) {
      return res.json({ message: 'record is not existed' })
    }
    const updatedRecord = await record.update(req.body)
    await Log.create({
      ...req.body,
      recorder: '豬涵',
      action: '編輯',
      ...oldRecord,
      RecordId: req.params.id
    })
    return res.json({ message: 'update success', updatedRecord })
  } catch (error) {
    return next(error)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id)
    if (!record) {
      return res.json({ message: 'record is not existed' })
    }
    const deletedRecord = await record.update({ deletedAt: new Date() })
    return res.json({ message: 'soft delete success', deletedRecord })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
