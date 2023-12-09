import libraryModel from "./models/library.js";

export default class LibrariesDao {

    getLibraryBy = (params,options={}) =>{
        if(options.populate){
            return libraryModel.findOne(params).populate('videogames.videogame').lean();
        }
        return libraryModel.findOne(params).lean();;
    }

    createLibrary = () => {
        return libraryModel.create({videogames:[]});
    }

    updateLibrary = (id,library) =>{
        return libraryModel.updateOne({_id:id},{$set:library})
    }

    deleteLibrary = (id) =>{
        return libraryModel.deleteOne({_id:id})
    }

}