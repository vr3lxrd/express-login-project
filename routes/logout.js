var express = require('express')
var router = express.Router()
const session = require('express-session')

router.get('/', (req,res)=>{
    session.id = null
    session.cargo = null
    return res.redirect('/login')
})

module.exports = router