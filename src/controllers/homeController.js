
import db from '../models/index'
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

module.exports = {
    getHomePage: getHomePage,
    getAboutGet: getAboutGet,
}