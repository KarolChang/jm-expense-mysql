const express = require('express')
const router = express.Router()

const db = require('../../models')
const Expense = db.Expense
const Category = db.Category

// create
router.post('/create', async (req, res, next) => {
  try {
    // req.body: date, item, amount, note, CategoryId
    console.log('req.body', req.body)
    const category = await Category.findByPk(req.body.CategoryId)
    if (!category) {
      return res.json({ message: 'category is not existed' })
    }
    const expense = await Expense.create(req.body)
    return res.json({ message: 'create success', expense })
  } catch (error) {
    return next(error)
  }
})

// read
router.get('/all', async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({
      include: [{ model: Category, as: 'Category' }],
      order: [['date', 'DESC']]
    })
    return res.json(expenses)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id, { include: [{ model: Category, as: 'Category' }] })
    if (!expense) {
      return res.json({ message: 'expense is not existed' })
    }
    return res.json(expense)
  } catch (error) {
    return next(error)
  }
})

// edit
router.put('/edit/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) {
      return res.json({ message: 'expense is not existed' })
    }
    const updatedExpense = await expense.update(req.body)
    return res.json({ message: 'update success', updatedExpense })
  } catch (error) {
    return next(error)
  }
})

// soft delete
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id)
    if (!expense) {
      return res.json({ message: 'expense is not existed' })
    }
    const deletedExpense = await expense.update({ deletedAt: new Date() })
    return res.json({ message: 'soft delete success', deletedExpense })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
