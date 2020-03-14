const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { // 使用 passport 認證
        successRedirect: '/', // 登入成功會回到根目錄
        failureRedirect: '/users/login' // 失敗會留在登入頁面
    })(req, res, next)
})

router.get('/regiter', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})




module.exports = router