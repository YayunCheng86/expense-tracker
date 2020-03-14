const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newUser = new Schema({
    name: { 
        type: String 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('User', newUser)