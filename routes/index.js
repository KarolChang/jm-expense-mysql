const express = require('express')
const router = express.Router()

const record = require('./modules/record')
const close = require('./modules/close')
const log = require('./modules/log')
const expense = require('./modules/expense')
const category = require('./modules/category')
const user = require('./modules/user')

router.use('/record', record)
router.use('/close', close)
router.use('/log', log)
router.use('/expense', expense)
router.use('/category', category)
router.use('/user', user)

module.exports = router
