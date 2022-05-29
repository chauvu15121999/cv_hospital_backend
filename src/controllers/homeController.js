
let getHomePage = (req , res) => {
    return res.render("homepage.ejs");
} 

let getAboutGet = (req , res ) => {
    // get view
    return res.render("test/about.ejs")
}

module.exports = {
    getHomePage: getHomePage,
    getAboutGet: getAboutGet,
}