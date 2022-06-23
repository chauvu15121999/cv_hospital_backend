import express from "express";
import bodyParser from "body-parser" // get query params user send to server
import viewEngine from "./config/viewEngine"// config view trong nodejs
import initWebRouter from "./route/web"
import connectDB from "./config/connectDB"
import cors from 'cors'

require('dotenv').config(); // get variable env 


let app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
// config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Khai báo view cho app 
viewEngine(app);
// Khai báo url cho app 
initWebRouter(app)

connectDB();

let port = process.env.PORT || 6969; 
// Port === undefined => port = 6969

app.listen(port , () => {
    console.log("Backend Nodejs is running on port :" + port)
})