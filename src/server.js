import express from "express";
import bodyParser from "body-parser" // get query params user send to server
import viewEngine from "./config/viewEngine"
import initWebRouter from "./route/web"
require('dotenv').config(); // get variable env 


let app =express();

// config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Khai báo view cho app 
viewEngine(app);
// Khai báo url cho app 
initWebRouter(app)

let port = process.env.PORT || 6969; 
// Port === undefined => port = 6969

app.listen(port , () => {
    console.log("Backend Nodejs is running on port :" + port)
})