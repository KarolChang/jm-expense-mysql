const express = require('express')
const router = express.Router()

const record = require('./modules/record')
const close = require('./modules/close')
const log = require('./modules/log')
const expense = require('./modules/expense')
const category = require('./modules/category')
const user = require('./modules/user')
const role = require('./modules/role')
const permission = require('./modules/permission')
const access = require('./modules/access')
const lineBot = require('./line/lineBot')
const appMsg = require('./modules/app-msg')

router.use('/record', record)
router.use('/close', close)
router.use('/log', log)
router.use('/expense', expense)
router.use('/category', category)
router.use('/user', user)
router.use('/role', role)
router.use('/permission', permission)
router.use('/access', access)
router.use('/callback', lineBot)
router.use('/app_msg', appMsg)

module.exports = router
