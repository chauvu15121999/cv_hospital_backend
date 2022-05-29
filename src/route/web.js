import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutGet);

    //rest api
    return app.use("/" , router);
}

module.exports = initWebRouter;
