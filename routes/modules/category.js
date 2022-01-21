const express = require('express')
const router = express.Router()

const db = require('../../models')
const Category = db.Category

// create
router.post('/create', async (req, res, next) => {
  try {
    // req.body: name, icon, photoUrl
    console.log('req.body', req.body)
    const category = await Category.create(req.body)
    return res.json({ status: 'success', data: category })
  } catch (error) {
    return next(error)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    return res.json({ status: 'success', data: categories })
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      return res.json({ status: 'error', message: 'category is not existed' })
    }
    return res.json({ status: 'success', data: category })
  } catch (error) {
    return next(error)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      return res.json({ status: 'error', message: 'category is not existed' })
    }
    const updatedCategory = await category.update(req.body)
    return res.json({ status: 'success', data: updatedCategory })
  } catch (error) {
    return next(error)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      return res.json({ status: 'error', message: 'category is not existed' })
    }
    const deletedCategory = await category.update({ deletedAt: new Date() })
    return res.json({ status: 'success', data: deletedCategory })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
