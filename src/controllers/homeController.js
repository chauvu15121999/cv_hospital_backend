
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
    await CRUDService.createNewUser(req.body);
    return res.send("post crud from server");
}

module.exports = {
    getHomePage: getHomePage,
    getAboutGet: getAboutGet,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}