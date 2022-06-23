import express from "express";
import { route } from "express/lib/application";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutGet);
    router.get('/crud' , homeController.getCRUD );
    
    router.get('/get-crud', homeController.displayCRUD);
    router.post('/post-crud' , homeController.postCRUD);

    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putEditCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)



    router.post('/api/login', userController.handleLogin)


    //rest api
    return app.use("/" , router);
}

module.exports = initWebRouter;
