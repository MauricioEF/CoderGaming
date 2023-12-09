
export default class MessagesRepository {

    constructor(dao){
        this.dao=dao;
    }
    getMessages = (params) =>{
        return this.dao.getMessages(params);
    }

    createMessage = (message) =>{
        return this.dao.createMessage(message);
    }
}