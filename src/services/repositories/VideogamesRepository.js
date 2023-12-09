export default class VideogamesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getVideogames = (params) => {
    return this.dao.getVideogames(params);
  };

  paginateVideogames = (params, paginateOptions) => {
    return this.dao.paginateVideogames(params, paginateOptions);
  };

  getVideogameBy = (params) => {
    return this.dao.getVideogameBy(params);
  };

  createVideogame = (videogame) => {
    return this.dao.createVideogame(videogame);
  };

  updateVideogame = (id, videogame) => {
    return this.dao.updateVideogame(id, videogame);
  };

  deleteVideogame = (id) => {
    return this.dao.deleteVideogame(id);
  };
}
