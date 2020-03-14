const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    res.redirect('/')
})

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', (req, res) => {
    res.redirect('/')
})

router.get('/', (req, res) => {
    res.render('login')
})




module.exports = router