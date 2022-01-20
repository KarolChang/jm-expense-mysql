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
    // 資料庫建立資料
    const user = await User.create({
      email,
      name: displayName,
      photoUrl,
      firebaseUid: firebaseUser.uid,
      active: true
    })
    return res.json({ message: 'register success', user })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
