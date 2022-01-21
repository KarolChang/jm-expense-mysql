const express = require('express')
const router = express.Router()
const adminApp = require('../../config/firebase')
const db = require('../../models')
const User = db.User

// register
router.post('/register', async (req, res, next) => {
  try {
    // req.body: email password displayName photoURL
    const { email, password, displayName, photoURL } = req.body
    // firebase 創建用戶
    const firebaseUser = await adminApp.auth().createUser({
      email,
      password,
      displayName,
      photoURL
      // emailVerified: false,
      // disabled: false,
    })
    console.log('firebaseUser', firebaseUser)
    return res.json({ message: 'success', data: firebaseUser })
  } catch (error) {
    return next(error)
  }
})

// 資料庫建立資料
router.post('/create', async (req, res, next) => {
  try {
    const { email, displayName, photoURL, firebaseUid } = req.body
    // 資料庫建立資料
    const user = await User.create({
      email,
      displayName,
      photoURL,
      firebaseUid,
      active: true
    })
    return res.json({ message: 'success', data: user })
  } catch (error) {
    return next(error)
  }
})

// get all
router.get('/all', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { active: true }
    })
    return res.json({ status: 'success', data: users })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
