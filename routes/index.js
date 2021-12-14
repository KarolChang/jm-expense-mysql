const express = require('express')
const router = express.Router()

const record = require('./modules/record')
const close = require('./modules/close')

router.use('/record', record)
router.use('/close', close)

module.exports = router
