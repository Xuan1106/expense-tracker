const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javascripts/tools')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const categories = await Category.find().lean()
    const categoryData = {}
    categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)

    const records = await Record.find({ userId }).sort({ date: 'asc' }).lean()

    let totalAmount = 0
    records.forEach(record => {
      record.date = dateToString(record.date)
      totalAmount += record.amount
      record.categoryIcon = categoryData[record.category]
    })
    return res.render('index', { records, totalAmount, categories })
  } catch (error) {
    console.error(error)
  }
})

router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryFiltered = req.query.category
    const monthFiltered = Number(req.query.month)
    const categories = await Category.find().lean()

    const filterQuery = { userId }

    categoryFiltered ? filterQuery.category = categoryFiltered : ''
    monthFiltered ? filterQuery.month = monthFiltered : ''

    const records = await Record.aggregate([
      { $project: { name: 1, category: 1, date: 1, amount: 1, merchant: 1, userId: 1, month: { $month: '$date' } } },
      { $match: filterQuery }
    ])

    const categoryData = {}
    categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)
    
    let totalAmount = 0
    records.forEach(record => {
      record.date = dateToString(record.date)
      totalAmount += record.amount
      record.categoryIcon = categoryData[record.category]
    })

    return res.render('index', { records, totalAmount, categoryFiltered, categories, monthFiltered })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router