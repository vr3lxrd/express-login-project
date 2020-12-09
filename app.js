const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb://localhost/userdb"
const { gestor_required, leitor_required, admin_required } = require('./helper')

session.cargo = null

MongoClient.connect(uri, (err, client) => {
    console.log('db connected')
    db = client.db('userdb')

    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
  })

app.set('view engine', 'ejs')
const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/static'));
app.use(expressLayouts)     
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'gracesSecret', cookie: { maxAge: 60000 }}))

app.get('/', (req, res) => {
    if (leitor_required()){
        return res.redirect('/login')
    }
    res.render('pages/index', {
        user: session.id,
        cargo: session.cargo,
        path: 'index',
        page: 'Home'
    })
})

app.route('/login')
    .get((req, res) => {
        session.id = null
        session.cargo = null
        res.render('pages/login', {
            path: 'login',
            page: 'Login'
        })
    })
    .post((req, res)  => {
        let found = false
        users = db.collection('users').find().toArray((err, data) => {
            try{
                data.forEach(element => {
                    if (element.username === req.body.username){
                        if (element.password === req.body.password){
                            session.id = element.username
                            session.cargo = element.cargo
                            found = true
                        }
                    }
                })
                found === false ? res.redirect('/login') : res.redirect('/')
                
            }
            catch(e){
                console.log(e)
            }
        })
        
    })


app.get('/users', (req,res) => {
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

app.route('/register')
    .get((req, res) => {
        res.render('pages/register', {
            path: 'login',
            page: 'Register'
        })
    })
    .post((req,res) => {
        console.log(req.body)
        db.collection('users').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)
            res.redirect('/')
        })
    })

app.get('/logout', (req,res)=>{
    session.id = null
    session.cargo = null
    return res.redirect('/login')
})
    