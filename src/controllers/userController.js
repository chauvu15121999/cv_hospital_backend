import { use } from 'bcrypt/promises'
import db from '../models/index'
import userService from "../services/userService"

let handleLogin = async (req , res) => {
    let email = req.body.email
    let password = req.body.password
    let userData = await userService.handleUserLogin(email , password)
    if(!email || !password ){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let status = userData.errCode > 0 ? 500 : 200
    return res.status(status).json({
        ...userData
    })
}

module.exports = {
    handleLogin: handleLogin
}