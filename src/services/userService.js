import db from '../models/index'
import bcrypt from 'bcrypt';


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

let compareUserPassword = () => {
    return new Promise((resolve , reject) => {
        try{

        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}