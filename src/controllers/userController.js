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

const handleGetUser = async (req , res ) => {
    let id = req.query.id; 
    let user = await userService.getUser(id);
    if(!user){
        return res.status(400).json({
            errCode: 1,
            message: 'User not found',
        })
    }
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data: user
    })
}

const handleCreateNewUser = async (req , res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(status).json(message)
}

const handleDeleteUser = async (req , res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            message: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

const handleEditUser = async (req , res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 2,
            message: 'missing required paramater'
        })
    }
    let message  = await userService.updateUserData(req.body);
    return res.status(200).json(message)
}


module.exports = {
    handleLogin: handleLogin,
    handleGetUser: handleGetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}