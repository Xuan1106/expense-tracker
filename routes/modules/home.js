const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javaScript/tools')


router.get('/', (req, res) => {
 return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
      record.date = dateToString(record.date)
      totalAmount += record.amount
    })
    res.render('index', { records, totalAmount })
    
    })
    .catch(err => console.error(err))
})

router.get('/filter', (req, res) => {
  const categoryEnName = req.query.category
  const categoryData = {
    'home': '家居物業',
    'transportation': '交通出行',
    'entertainment': '休閒娛樂',
    'food': '餐飲食品', 
    'others': '其他'
  }
  const category = categoryData[categoryEnName]

  if (!category) return res.redirect('/')
  return Record.find({ category })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, category })
    })
})
module.exports = router