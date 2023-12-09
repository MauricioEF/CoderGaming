import { messagesService } from "../services/repositories.js";

const getMessages = async(req,res)=>{
    //JAMÁS CARGUES TODOS LOS MENSAJES
    const {room} = req.params;
    const date = new Date(); //Trae la fecha actual
    date.setMonth(date.getMonth()-1);
    const searchFilter = {
        createdAt: {$gte: date.toISOString()}
    }
    if(room){
        searchFilter.room = room;
    }
    const messages = await messagesService.getMessages(searchFilter);
    res.sendSuccessWithPayload(messages);
}

export default {
    getMessages
}