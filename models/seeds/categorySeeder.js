if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const categoryData = [
  {
    categoryName: '家居物業',
    categoryEnName: 'home',
    categoryIcon: 'fas fa-home'
  },
  {
    categoryName: '交通出行',
    categoryEnName: 'transportation',
    categoryIcon: 'fas fa-shuttle-van'
  },
  {
    categoryName: '休閒娛樂',
    categoryEnName: 'entertainment',
    categoryIcon: 'fas fa-grin-beam'
  },
  {
    categoryName: '餐飲食品',
    categoryEnName: 'food',
    categoryIcon: 'fas fa-utensils'
  },
  {
    categoryName: '其他',
    categoryEnName: 'others',
    categoryIcon: 'fas fa-pen'
  }
]

db.once('open', () => {
  Category.create(categoryData)
    .then(() => {
      console.log('categorySeeder done')
      return db.close()
    })
    .catch((err) => console.error(err))
})
