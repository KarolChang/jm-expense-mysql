const express = require('express')
const router = express.Router()
const adminApp = require('../../config/firebase')
const db = require('../../models')
const User = db.User
const Role = db.Role

// register
router.post('/register', async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err)
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
      active: true,
      RoleId: 3
    })
    return res.json({ message: 'success', data: user })
  } catch (err) {
    return next(err)
  }
})

// get all
router.get('/all', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { active: true }
    })
    return res.json({ status: 'success', data: users })
  } catch (err) {
    return next(err)
  }
})

// get one
router.get('/:email', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.params.email, active: true },
      include: [{ model: Role, as: 'Role' }]
      // include: { all: true }
    })
    if (!user) {
      res.json({ status: 'error', message: "this email doesn't exist" })
    }
    return res.json({ status: 'success', data: user })
  } catch (err) {
    return next(err)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.json({ status: 'error', message: 'user is not existed' })
    }
    const updatedUser = await user.update(req.body)
    return res.json({ status: 'success', data: updatedUser })
  } catch (err) {
    return next(err)
  }
})

// 停用 deactive
router.post('/deactive/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.json({ status: 'error', message: 'user is not existed' })
    }
    if (!user.active) {
      return res.json({ status: 'error', message: 'user has been deactived' })
    }
    // firebase 停用帳號
    await adminApp.auth().updateUser(user.firebaseUid, {
      disabled: true
    })
    const updatedUser = await user.update({ active: false })
    return res.json({ status: 'success', data: updatedUser })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
