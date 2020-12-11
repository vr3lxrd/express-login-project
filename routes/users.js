var express = require('express')
var router = express.Router()
const session = require('express-session')
const { admin_required } = require('../controller/helper')

router.get('/', (req,res) => {
    if (admin_required()){
        return res.redirect('/')
    }
    db.collection('users').find().toArray((err,data) => {
        res.render('pages/users', {
            user: session.id,
            cargo: session.cargo,
            path: 'users',
            page: 'Usuários',
            users: data
        })
    })
    
})


module.exports = router