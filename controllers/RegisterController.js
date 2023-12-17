const db = require('../database/DB')
const bcrypt = require('bcrypt')

const register = async (user) =>{
    
    if(user.email == '') return false
    if(user.name == '') return false
    if(user.password == '') return false
    if(user.cpassword == '') return false
    if(user.password != user.cpassword) return false

    try {
        const hass_pass = await bcrypt.hash(user.password, 10)
        const register_user = `INSERT INTO users(email , full_name , password) VALUES('${user.email}' , '${user.name}' , '${hass_pass}')`
        const instert = await db.query(register_user)
        
        if(instert){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = register