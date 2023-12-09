

export default class LibrariesRepository {

    constructor(dao){
        this.dao = dao;
    }

    getLibraryBy = (params,options={}) =>{
        return this.dao.getLibraryBy(params,options);
    }

    createLibrary = () => {
        return this.dao.createLibrary();
    }

    updateLibrary = (id,library) =>{
        return this.dao.updateLibrary(id,library);
    }

    deleteLibrary = (id) =>{
        return this.dao.deleteLibrary(id);
    }

}