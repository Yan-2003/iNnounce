const db = require('../database/DB')

const auth = (req ,res , next)=>{
    if(req.session.user === undefined){
        console.log(req.session.user)
        return res.send({message :'unauthorized'})
    }
    return next()
}

module.exports = auth