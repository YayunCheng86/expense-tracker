const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// read all expenses page
router.get('/', (req, res) => {
    res.redirect('/')
})

// read the new page
router.get('/new', (req, res) => {
    res.render('new')
})

// post a new expense
router.post('/new', (req, res) => {
    const { name, date, category, amount } = req.body

    const record = new Record({
        name,
        date,
        category,
        amount,
    })

    record.save((err) => {
        if (err) return console.error(err)
        return res.redirect('/')
    })
})

// read the edit page
router.get('/edit/:id', (req, res) => {
    res.render('edit')
})

// edit an expense
router.put('/edit/:id', (req, res) => {
    res.send('edit t')
})

// delete an expense
router.delete('/delete/:id', (req, res) => {
    res.send('delete')
})


module.exports = router

// fa-lg