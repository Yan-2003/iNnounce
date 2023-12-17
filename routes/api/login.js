const express = require('express')
const route = express.Router()
const login = require('../../controllers/LoginController')

route.post('/' , async (req ,res)=>{


    const isLogin = await login(req.body)

    if(isLogin.status){
        req.session.user = isLogin.user
        res.redirect("/")
    }else{
        res.redirect('/pages/login.html?message=something went wrong.')
    }


})



module.exports = route