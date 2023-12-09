import videogameModel from './models/videogame.js';

export default class VideoGamesDao {
  getVideogames = (params) => {
    return videogameModel.find(params).lean();
  };

  paginateVideogames = (params,paginateOptions) => {
    return videogameModel.paginate(params,paginateOptions)
  }

  getVideogameBy = (params) => {
    return videogameModel.findOne(params).lean();
  };

  createVideogame = (videogame) => {
    return videogameModel.create(videogame);
  };

  updateVideogame = (id, videogame) => {
    return videogameModel.updateOne({ _id: id }, { $set: videogame });
  };

  deleteVideogame = (id) => {
    return videogameModel.deleteOne({ _id: id });
  };
}
