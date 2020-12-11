var express = require('express')
var router = express.Router()
const session = require('express-session')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

router.get('/', (req, res) => {
    session.id = null
    session.cargo = null
    res.render('pages/login', {
        path: 'login',
        page: 'Login',
        error: false,
        message: ''
    })
})

router.post('/', async (req, res) => {
    fetchUser = db.collection('users').find().toArray((err, data) => {
        try{
            data.forEach(element => {
                if (element.name === req.body.username){
                    bcrypt.compare(req.body.password, element.password, function(err, result) {
                        if (result === true){
                            session.id = uuidv4()
                            session.user = element.name
                            session.cargo = element.cargo
                            return res.redirect('/')
                        }
                        else{
                            return res.render('pages/login', {
                                path: 'login',
                                page: 'Login',
                                error: true,
                                message: 'Usuário e/ou senha incorretas!'
                            })
                        }
                    })
                }
                }
            )
        }
        catch(e){
            console.log(e)
        }
    })
    
})


module.exports = router