import bcrypt from 'bcrypt';
import { reject } from 'bcrypt/promises';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


let createNewUser = (data) => {
    return new Promise( async (resolve , reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password);
            await db.Users.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender ?  true : false,
                roledid: data.roleId,
                phoneNumber: data.phoneNumber
            })
            resolve('ok create a new user succeed!')
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise( async (resolve , reject) => {
        try{
            const users = await db.Users.findAll({
                raw: true,
            });
            resolve(users);
        }catch(e){
            reject(e)
        }
    })
}

let getUserByID = (userId) => {
    return new Promise( async (resolve , reject) => {
        try{
            const user = await db.Users.findOne({
                where: {
                   id: userId
                },
                raw: true,
            })
            if (user) {
                resolve(user)
            }else {
                resolve({})
            }
           
        }catch(e){
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve , reject) => {
        try{
            const user = await db.Users.findOne({
                where: {
                   id: data.id
                },
            })           
            if(user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save();
                resolve('update success')
            }else{
                resolve('update fail')
            }
        }catch(e){
            reject(e)
        }
    })
}

let deleteUserById = (userID) => {
    return new Promise( async (resolve , reject ) => {
        try{
            const user = await db.Users.findOne({
                where: {
                   id: userID
                }
            })  

            if(user) {
                user.destroy();
            }

            resolve('Delete the user succeed!'); // return
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserByID: getUserByID,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}