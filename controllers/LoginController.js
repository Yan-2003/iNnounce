const db = require('../database/DB')
const bcrypt = require('bcrypt')

const LoginController = async (user) =>{
        
    if(user.email == '') return false
    if(user.password == '') return false

    const login_user = `SELECT * FROM users WHERE email = '${user.email}'`

    try {
        const data = await db.query(login_user)

        const pass = await bcrypt.compare(user.password , data.rows[0].password)

        if(pass){
            return {
                status : true,
                user : data.rows[0]
            }
        }else{
            return false
        }
    } catch (error) {
        return false
    }

    
}

module.exports = LoginController