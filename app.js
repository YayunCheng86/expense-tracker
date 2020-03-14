const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('method'))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb has some errors.')
})

db.once('open', () => {
    console.log('mongodb connected!')
})


// 2) 在首頁看到所有支出清單的總金額
// 6) 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

// require routes
app.use('/', require('./routes/home'))
app.use('/expenses', require('./routes/record'))
// app.use('/', require('./routes/home'))

// app.use((req, res, next) => {
//     res.locals.myname = 'Laura'
//     next()
// })

app.listen(port, () => {
    console.log('The app is listening on localhost:3000')
})