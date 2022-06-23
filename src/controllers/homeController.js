
import db from '../models/index'
import CRUDService from "../services/CRUDService"

let getHomePage = async (req , res) => {
    try {
        let data = await db.Users.findAll();
        return res.render("homepage.ejs",{
            data: JSON.stringify(data)
        });
    }catch(e) {
        console.log(e)
    }
} 

let getAboutGet = (req , res ) => {
    // get view
    return res.render("test/about.ejs")
}

let getCRUD = (req , res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req , res) => {
    let message  = await CRUDService.createNewUser(req.body);
    return res.send(message);
}

let displayCRUD = async (req , res) => {
    let users = await CRUDService.getAllUser();
    return res.render("displayCRUD.ejs", {dataTable: users})
}

let getEditCRUD = async (req , res) => {
    let userId = req.query.id
    if(userId){
        let userData = await CRUDService.getUserByID(userId);
        // Check user data not found
        return res.render("editCRUD.ejs", {dataTable: userData})
    }else {
        return res.send('User not found');
    }
}

let putEditCRUD = async (req , res ) => {
    let message  = await CRUDService.updateUserData(req.body);
    return res.send(message);
}

let deleteCRUD = async (req , res) => {
     let id = req.query.id;
     if(id) {
        let message = await CRUDService.deleteUserById(id)
        return res.send(message);
     }else{
        return res.send('Please type id !');
     }

}

module.exports = {
    getHomePage: getHomePage,
    getAboutGet: getAboutGet,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putEditCRUD: putEditCRUD,
    deleteCRUD: deleteCRUD
}