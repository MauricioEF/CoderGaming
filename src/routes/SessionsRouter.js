import sessionsController from "../controllers/sessions.controller.js";
import passportCall from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";


class SessionsRouter extends BaseRouter {
    init(){
        this.post('/register',['NO_AUTH'],passportCall('register',{strategyType:'LOCALS'}),sessionsController.register)
        this.post('/login',['NO_AUTH'],passportCall('login',{strategyType:'LOCALS'}),sessionsController.login)

        this.get('/google',['NO_AUTH'],passportCall('google',{scope:['profile','email'],strategyType:'OAUTH'}),async (req,res)=>{})
        this.get('/googlecallback', ['NO_AUTH'],passportCall('google',{strategyType:'OAUTH'}),sessionsController.applyGoogleCallback);
        this.get('/current',['AUTH'],sessionsController.current)
        this.post('/passwordRestoreRequest',['PUBLIC'], sessionsController.passwordRestoreRequest);
        this.put('/password-restore',['PUBLIC'], sessionsController.restorePassword);
        this.post('/attempt',['NO_AUTH'],sessionsController.checkAttemptStatus);
    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();