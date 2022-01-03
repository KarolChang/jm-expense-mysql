const express = require('express')
const router = express.Router()

const record = require('./modules/record')
const close = require('./modules/close')
const log = require('./modules/log')
const lineBot = require('./modules/lineBot')

router.use('/record', record)
router.use('/close', close)
router.use('/log', log)
router.use('/lineBot', lineBot)

module.exports = router
