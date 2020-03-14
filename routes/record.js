const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const selectOption = require('../public/javascripts/main')

// read all expenses page
router.get('/', (req, res) => {
    res.redirect('/')
})

// read the new page
router.get('/new', (req, res) => {
    res.render('new')
})

// post a new record
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
router.get('/:id/edit', (req, res) => {
    Record.findById( req.params.id)
    .lean()
    .exec((err, record) => {
        if(err) return console.log(err) 

        // remain select option
        const categories = ['daily-necessities', 'transportation', 'entertainment', 'food', 'others']
        categories.forEach(category => {
            if(record.category === category){
                record[`select${category}`] = true
            }
        })
    
        return res.render('edit', { record })
    })
})

// edit an expense
router.put('/:id/edit', (req, res) => {
    console.log(req.params.id)
    const { name, date, category, amount } = req.body
    Record.findById(req.params.id, (err, record) => {
        if(err) return console.error(err)
        record.name = name
        record.date = date
        record.category = category
        record.amount = amount
        record.save(err => {
            if (err) return console.error(err)
            res.redirect('/')    
        })
    })
})

// delete an expense
router.delete('/:id/delete', (req, res) => {
    Record.findById(req.params.id, (err, record) => {
        if(err) return console.log(err)
        record.remove(err => {
            if(err) return console.log(err)
            res.redirect('/')
        })
    })
})


module.exports = router

