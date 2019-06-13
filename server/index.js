require('dotenv').config()
const express = require('express')
const session = require('express-session')
const { SERVER_PORT, SESSION_SECRET } = process.env
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const app = express()
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.get('/api/swag', swagCtrl.read)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => console.log('listening on port', SERVER_PORT))