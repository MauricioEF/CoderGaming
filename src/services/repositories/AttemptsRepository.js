
export default class AttemptsRepository {
    constructor(dao){
        this.dao = dao;
    }

    getAttemptBy = (params) =>{
        return this.dao.getAttemptBy(params);
    }

    createAttempt = (attempt) =>{
        return this.dao.createAttempt(attempt);
    }

    updateAttempt = (id, attempt) =>{
        return this.dao.updateAttempt(id,attempt);
    }
}