const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')  //引入bcryptjs 

// 引入model
const User = require('../user')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')

    // 創造new users
    const user1 = new User({
        email: 'user1@example.com',
        password: '12345678'
    })
    const user2 = new User({
        email: 'user2@example.com',
        password: '12345678'
    })

    // bcrypt隱藏user1、user2密碼
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user1.password, salt, (err, hash) => {
            if (err) throw err
            user1.password = hash

            user1
            .save()
            .catch(err => console.log(err))
        })
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user2.password, salt, (err, hash) => {
            if (err) throw err
            user2.password = hash

            user2
            .save()
            .catch(err => console.log(err))
        })
    })
})