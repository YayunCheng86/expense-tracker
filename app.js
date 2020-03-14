const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {      
    require('dotenv').config()                      
}

const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb has some errors.')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

// 載入session
app.use(session({
    secret: 'just do it',
    resave: false,
    saveUninitialized: true
}))

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated() 
    next()
})

// 6) 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

// require routes
app.use('/', require('./routes/home'))
app.use('/expenses', require('./routes/record'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'))



app.listen(port, () => {
    console.log('The app is listening on localhost:3000')
})