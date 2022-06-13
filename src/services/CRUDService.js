import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);


let createNewUser = (data) => {
    let hashPassword =  hashUserPassword(data.password)
    console.log('data from service')
    console.log(data);
    console.log(hashPassword)
}

let hashUserPassword =  (password) => {
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
    createNewUser: createNewUser
}