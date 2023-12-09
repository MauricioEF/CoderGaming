import viewsController from "../controllers/views.controller.js";
import BaseRouter from "./BaseRouter.js";

class ViewsRouter extends BaseRouter {
    init(){

        this.get('/register',['NO_AUTH'],viewsController.register);
        this.get('/login',['NO_AUTH'],viewsController.login);
        this.get('/profile',['AUTH'], viewsController.profile);
        this.get('/',['PUBLIC'],viewsController.home);
        this.get('/videogames/:vid',['PUBLIC'],viewsController.videogameDetails);
        this.get('/password-restore',['PUBLIC'],viewsController.passwordRestore);
        this.get('/library',['USER'],viewsController.library);
        this.get('/premium-upgrade',['USER'],viewsController.premiumUpgrade);
        this.get('/videogame-creator',['ADMIN','PREMIUM'],viewsController.videogameCreator);
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();