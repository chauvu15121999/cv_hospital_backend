import db from '../models/index'
import bcrypt from 'bcrypt';
import { reject } from 'bcrypt/promises';
const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise( async (resolve , reject) => {
        try{
            let userData = {};

            let user = await checkUserEmail(email);
            if(user){
                let check = await bcrypt.compareSync(password , user.password)
                if(check) {
                    userData.errCode = 0;
                    userData.message = 'ok',
                    delete user.password
                    userData.user = user
                }else{
                    userData.errCode = 2;
                    userData.message = `Your's password incorrect`;
                }
            }else {
                userData.errCode = 1
                userData.message = `Your's Email isn't exist in system. Plz try other email!`
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve , reject)  => {
        try{
            let user = await db.Users.findOne({
                where: {
                    email: userEmail
                },
                attributes: ['email','roleId','password'],
                raw: true
            })

            if(user) {
                resolve(user)
            }else{
                resolve(false)
            }
        }catch (e){
            reject(e)
        }
    })
}

let  getUser = (userId) => {
    return new Promise(async (resolve , reject) => {
        try{
            let user;
            if(userId){
                user = await db.Users.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }else {
                user = db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(user)
        }catch(e){
            reject(e)
        }
    })
}

const createNewUser = (data) => {
    return new Promise( async (resolve , reject) => {
        try{
            let check = await checkUserEmail(data.email)
            if(check){
                resolve({
                    errCode: 1,
                    message: "Your email is already is used, Plz try another email!",
                })
            }
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
            resolve({
                errCode: 0,
                message: "OK"
            })
        }catch(e){
            reject(e)
        }
    })
}

let deleteUser = (userID) => {
    return new Promise( async (resolve , reject ) => {
        try{
            const user = await db.Users.findOne({
                where: {
                   id: userID
                },
                raw: false
            })  

            if(user) {
                await user.destroy();
                resolve({
                    errCode: 0,
                    message: 'Delete the user succeed!'
                });
            }else {
                resolve({
                    errCode: 2,
                    message: 'User not exist!'
                });
            }
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
                raw: false
            })           
            if(user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'update the user succeeds!'
                });
            }else{
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
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

module.exports = {
    handleUserLogin: handleUserLogin,
    getUser: getUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}