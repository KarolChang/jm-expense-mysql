const express = require('express')
const router = express.Router()

const record = require('./modules/record')
const close = require('./modules/close')
const log = require('./modules/log')
const lineBot = require('./modules/lineBot')
const expense = require('./modules/expense')
const category = require('./modules/category')

router.use('/record', record)
router.use('/close', close)
router.use('/log', log)
router.use('/lineBot', lineBot)
router.use('/expense', expense)
router.use('/category', category)

module.exports = router
