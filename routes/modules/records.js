const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javaScript/tools')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const record = req.body
  return Record.create({ 
    name: record.name,
    date: record.date,
    category: record.category,
    amount: record.amount 
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      const currentDate = dateToString(record.date)
      res.render('edit', { record, currentDate })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router