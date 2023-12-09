import videogamesController from '../controllers/videogames.controller.js';
import uploader from '../services/uploadService.js';
import BaseRouter from './BaseRouter.js';

class VideogamesRouter extends BaseRouter {
    init(){
        this.get('/',['PUBLIC'], videogamesController.getVideogames)
        this.post('/',['ADMIN','PREMIUM'],uploader.array('images'),videogamesController.createVideogame)
        this.put('/:vid',['ADMIN'], videogamesController.updateVideogame)
        this.delete('/:vid',['ADMIN'],videogamesController.deleteVideogame)
    }
}

const videogamesRouter = new VideogamesRouter();

export default videogamesRouter.getRouter();