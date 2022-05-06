const express = require('express')
const router = express.Router()

const db = require('../../models')
const Expense = db.Expense
const Category = db.Category
const User = db.User

// create
router.post('/create', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const { date, item, amount, note, CategoryId, UserId } = req.body
    const category = await Category.findByPk(req.body.CategoryId)
    if (!category) {
      return res.json({ status: 'error', message: 'category is not existed' })
    }
    const expense = await Expense.create({ date, item, amount, note, CategoryId, UserId })
    return res.json({ status: 'success', data: expense })
  } catch (err) {
    return next(err)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        { model: Category, as: 'Category' },
        { model: User, as: 'User' }
      ],
      order: [['date', 'DESC']]
    })
    return res.json({ status: 'success', data: expenses })
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id, { include: [{ model: Category, as: 'Category' }] })
    if (!expense) {
      return res.json({ status: 'error', message: 'expense is not existed' })
    }
    return res.json({ status: 'success', data: expense })
  } catch (err) {
    return next(err)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const { date, item, amount, note, CategoryId, UserId } = req.body
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) {
      return res.json({ status: 'error', message: 'expense is not existed' })
    }
    const updatedExpense = await expense.update({ date, item, amount, note, CategoryId, UserId })
    return res.json({ status: 'success', data: updatedExpense })
  } catch (err) {
    return next(err)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) {
      return res.json({ status: 'error', message: 'expense is not existed' })
    }
    const deletedExpense = await expense.destroy()
    return res.json({ status: 'success', data: deletedExpense })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
