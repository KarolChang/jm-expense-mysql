const express = require('express')
const router = express.Router()

const db = require('../../models')
const Role = db.Role
const Access = db.Access
const Permission = db.Permission

// create
router.post('/create', async (req, res, next) => {
  try {
    const { name, name_en } = req.body
    const role = await Role.create({ name, name_en })
    return res.json({ status: 'success', data: role })
  } catch (err) {
    return next(err)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: Permission, as: 'Permissions' }],
      order: [['date', 'DESC']]
    })
    return res.json({ status: 'success', data: roles })
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id, { include: [{ model: Permission, as: 'Permissions' }] })
    if (!role) {
      return res.json({ status: 'error', message: 'role is not existed' })
    }
    return res.json({ status: 'success', data: role })
  } catch (err) {
    return next(err)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const { name, name_en } = req.body
    const role = await Role.findByPk(req.params.id, { include: [{ model: Permission, as: 'Permissions' }] })
    if (!role) {
      return res.json({ status: 'error', message: 'role is not existed' })
    }
    const updatedRole = await role.update({ name, name_en, permissions })
    return res.json({ status: 'success', data: updatedRole })
  } catch (err) {
    return next(err)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id, { include: [{ model: Permission, as: 'Permissions' }] })
    if (!role) {
      return res.json({ status: 'error', message: 'role is not existed' })
    }
    const deletedRole = await role.destroy()
    return res.json({ status: 'success', data: deletedRole })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
