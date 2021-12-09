const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// route
app.get('/', (req, res) => {
  res.send('JM Expense')
})

// error message
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ status: 'error', message: String(err) })
    return next()
  }
})

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})
