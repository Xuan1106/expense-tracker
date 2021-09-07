const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const hbsHelpers = require('handlebars-helpers')
const multiHelpers = hbsHelpers()
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const PORT = process.env.PORT
const app = express()


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multiHelpers }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
