import express from "express";
import { route } from "express/lib/application";
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutGet);
    router.get('/crud' , homeController.getCRUD );
    
    router.post('/post-crud' , homeController.postCRUD);
    //rest api
    return app.use("/" , router);
}

module.exports = initWebRouter;
