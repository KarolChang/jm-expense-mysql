const express = require('express')
const router = express.Router()

const record = require('./modules/record')

router.use('/record', record)

module.exports = router
