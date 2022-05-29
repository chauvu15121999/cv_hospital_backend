import express from "express";

const configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine" , "ejs"); 
    app.set("views" , "./src/views") // tất cả file view đều vô folder này lấy ra 
};

module.exports = configViewEngine;