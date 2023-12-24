require('dotenv').config()
const express = require('express')
const express_session = require('express-session')
const auth = require('./middlewares/auth')
const path = require('path')
const port = process.env.PORT
const app = express()
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname , 'public')))
app.use(express_session({
    secret : process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}))

/* api routes */
const RegisterRouter = require('./routes/api/register')
app.use('/api/register' , RegisterRouter)

const LoginRouter = require('./routes/api/login')
app.use('/api/login' , LoginRouter)


const HomeRouter = require('./routes/api/home')
app.use('/api/home' , auth, HomeRouter)

/* public apis */
const EventRouter = require('./routes/api/event')
app.use('/api/event' , EventRouter)



 /* web routes */



app.listen(port, () => console.log(`Example app listening on port ${port}!`))