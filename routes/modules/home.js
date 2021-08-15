const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javaScript/tools')


router.get('/', (req, res) => {
 return Record.find()
    .lean()
    .then(records => {
      records.forEach(record => record.date = dateToString(record.date))
      res.render('index', { records })
    })
    .catch(err => console.error(err))
})

module.exports = router