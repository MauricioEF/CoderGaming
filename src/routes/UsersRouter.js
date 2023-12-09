import usersController from "../controllers/users.controller.js";
import BaseRouter from "./BaseRouter.js";

class UsersRouter extends BaseRouter {
    init(){
        this.get('/premium',['USER'],usersController.upgradeUser);
        this.post('/membership-expired',['PUBLIC'],usersController.expireMembership)
    }
}

const usersRouter = new UsersRouter();

export default usersRouter.getRouter();