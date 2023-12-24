const express = require('express')
const route = express.Router()


route.get('/', (req ,res)=>{
    res.send('data')
})

route.get('/events' , (req ,res)=>{
    
})





module.exports = route