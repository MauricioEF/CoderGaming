import messagesController from "../controllers/messages.controller.js";
import BaseRouter from "./BaseRouter.js";

class MessagesRouter extends BaseRouter {
    init(){
        this.get('/:room',['AUTH'],messagesController.getMessages)
    }
}


const messagesRouter = new MessagesRouter();

export default messagesRouter.getRouter();