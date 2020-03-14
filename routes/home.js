const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
    Record.find({ userId: req.user._id })
    .lean()
    .exec((err, records) => {
        if(err) return console.error(err)

        let totalAmount = 0

        records.forEach(record => {
            totalAmount += record.amount

            switch (record.category) {
                case 'daily-necessities':
                    record.icon = 'fas fa-home'
                    break;
                case 'transportation':
                    record.icon = 'fas fa-shuttle-van'
                    break;
                case 'entertainment':
                    record.icon = 'fas fa-grin-beam'
                    break;
                case 'food':
                    record.icon = 'fas fa-utensils'
                    break;
                case 'others':
                    record.icon = 'fas fa-pen'
                    break;
            }
        })
       
        return res.render('index', { records, totalAmount })
    })
    
})

module.exports = router