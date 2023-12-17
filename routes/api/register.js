const express = require('express')
const route = express.Router()
const register = require('../../controllers/RegisterController')


/* this is the register routes */
route.post('/' , (req ,res)=>{

    if(register(req.body)){
        res.redirect("/pages/login.html")
    }else{
        res.redirect('/pages/register.html?message=something went wrong.')
    }


})


module.exports = route