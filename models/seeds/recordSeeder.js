if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const db = require('../../config/mongoose')

const SEED_DATA = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-08-01',
    amount: 300
  },
  {
    name: '宵夜',
    category: '餐飲食品',
    date: '2021-08-02',
    amount: 100
  },
  {
    name: '電鍋',
    category: '家居物業',
    date: '2021-08-04',
    amount: 1200
  },
  {
    name: 'Netflix',
    category: '休閒娛樂',
    date: '2021-08-05',
    amount: 390
  }
]

db.once('open', () => {
  return Record.create(SEED_DATA)
    .then(() => {
      console.log('recordSeeder done')
      return db.close()
    })
    .catch(err => console.log(err))
})