const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'User1',
  email: 'user1@example.com',
  password: '12345678'
}


const SEED_DATA = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-08-01',
    amount: 300,
    merchant: '麥當勞'
  },
  {
    name: '宵夜',
    category: '餐飲食品',
    date: '2021-08-02',
    amount: 100,
    merchant: '滷味'
  },
  {
    name: '電鍋',
    category: '家居物業',
    date: '2021-08-04',
    amount: 1200,
    merchant: '全國電子'
  },
  {
    name: 'Netflix',
    category: '休閒娛樂',
    date: '2021-08-05',
    amount: 390,
    merchant: 'Netflix'
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        password: hash,
        email: SEED_USER.email
      })
    )
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: SEED_DATA.length }, (_, i) =>
          Record.create({
            name: SEED_DATA[i].name,
            category: SEED_DATA[i].category,
            date: SEED_DATA[i].date,
            amount: SEED_DATA[i].amount,
            merchant: SEED_DATA[i].merchant,
            userId
          })
        )
      )
    })
    .then(() => {
      console.log('recordSeeder done ')
      return db.close()
    })
    .catch((err) => console.error(err))
})