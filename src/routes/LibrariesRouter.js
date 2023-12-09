import librariesController from '../controllers/libraries.controller.js';
import BaseRouter from './BaseRouter.js';

class LibrariesRouter extends BaseRouter {
    init(){
        this.get('/:lid',['USER'],librariesController.getLibrary)
        this.post('/',['ADMIN'],librariesController.createLibrary)
        this.put('/:lid/videogames/:vid',['NO_AUTH'],librariesController.insertVideogameWithLibraryId)
        this.put('/videogames/:vid',['USER'],librariesController.insertVideogameWithUser)
    }
}

const librariesRouter = new LibrariesRouter();

export default librariesRouter.getRouter();