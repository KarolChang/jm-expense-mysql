const express = require('express')
const router = express.Router()

const db = require('../../models')
const Permission = db.Permission
const Role = db.Role

// create
router.post('/create', async (req, res, next) => {
  try {
    const { action, item, description } = req.body
    const permission = await Permission.create({ action, item, description })
    return res.json({ status: 'success', data: permission })
  } catch (err) {
    return next(err)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const permissions = await Permission.findAll({
      include: [{ model: Role, as: 'Roles' }],
      order: [['date', 'DESC']]
    })
    return res.json({ status: 'success', data: permissions })
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const permission = await Permission.findByPk(req.params.id, { include: [{ model: Role, as: 'Roles' }] })
    if (!permission) {
      return res.json({ status: 'error', message: 'permission is not existed' })
    }
    return res.json({ status: 'success', data: permission })
  } catch (err) {
    return next(err)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const { action, item, description } = req.body
    const permission = await Permission.findByPk(req.params.id, { include: [{ model: Role, as: 'Roles' }] })
    if (!permission) {
      return res.json({ status: 'error', message: 'permission is not existed' })
    }
    const updatedPermission = await permission.update({ action, item, description })
    return res.json({ status: 'success', data: updatedPermission })
  } catch (err) {
    return next(err)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const permission = await Permission.findByPk(req.params.id, { include: [{ model: Role, as: 'Roles' }] })
    if (!permission) {
      return res.json({ status: 'error', message: 'permission is not existed' })
    }
    const deletedPermission = await permission.destroy()
    return res.json({ status: 'success', data: deletedPermission })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
