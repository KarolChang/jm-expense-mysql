const express = require('express')
const router = express.Router()

const db = require('../../models')
const Permission = db.Permission
const Role = db.Role
const Access = db.Access

// create
router.post('/create', async (req, res, next) => {
  try {
    const { permissions, RoleId } = req.body
    const permissionIdsArr = permissions.split(',')
    const existedAccesses = await Access.findAll({ where: { RoleId: Number(RoleId) }, paranoid: false })
    const addAccesses = []
    const restoredAccesses = []
    for (let permissionId of permissionIdsArr) {
      const access = existedAccesses.find((access) => access.PermissionId === Number(permissionId))
      if (access) {
        if (access.deletedAt !== null) {
          restoredAccesses.push({ RoleId: Number(RoleId), PermissionId: access.PermissionId })
          // restore
          await Access.restore({
            where: { RoleId: Number(RoleId), PermissionId: access.PermissionId }
          })
        }
      } else {
        // 整理要新增的
        addAccesses.push({ RoleId: Number(RoleId), PermissionId: Number(permissionId) })
      }
    }

    // 批次新增
    const addedAccesses = await Access.bulkCreate(addAccesses)

    return res.json({ status: 'success', data: { addedAccesses, restoredAccesses } })
  } catch (err) {
    return next(err)
  }
})

// soft delete
router.delete('/delete', async (req, res, next) => {
  try {
    const { permissions, RoleId } = req.body
    const permissionIdsArr = permissions.split(',')
    const existedAccesses = await Access.findAll({ where: { RoleId: Number(RoleId) }, paranoid: false })
    const deletedAccesses = []
    for (let permissionId of permissionIdsArr) {
      const access = existedAccesses.find((access) => access.PermissionId === Number(permissionId))
      if (access) {
        if (access.deletedAt === null) {
          deletedAccesses.push({ RoleId: Number(RoleId), PermissionId: access.PermissionId })
          // delete
          await Access.destroy({
            where: { RoleId: Number(RoleId), PermissionId: access.PermissionId }
          })
        }
      }
    }
    return res.json({ status: 'success', data: { deletedAccesses } })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
