const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
require('dotenv').config()
const { is_not_logged } = require('./auth')

console.log(process.env.DB_HOST, process.env.DB_NAME)

const port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, (err, client) => {
    db = client.db(process.env.DB_NAME)
    app.listen(port, () => {
        console.log(`Link do servidor: http://localhost:${port}`)
    })
  })
  

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/../static'));
app.use(expressLayouts)     
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'gracesSecret', cookie: { maxAge: 60000 }}))

const register = require('../routes/register')
const logout = require('../routes/logout')
const users = require('../routes/users')
const login = require('../routes/login')
app.use('/register', register)
app.use('/logout', logout)
app.use('/users', users)
app.use('/login', login)

app.get('/', (req, res) => {
    if (is_not_logged()) { 
        return res.redirect('/login')
        
    }
    res.render('pages/index', {
        user: session.user,
        cargo: session.cargo,
        path: 'index',
        page: 'Home'
    })
})
