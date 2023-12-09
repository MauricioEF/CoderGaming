import attemptModel from "./models/attempt.js";

export default class AttemptsDao {

    getAttemptBy = (params) =>{
        return attemptModel.findOne(params);
    }

    createAttempt = (attempt) =>{
        return attemptModel.create(attempt);
    }

    updateAttempt = (id,attempt) =>{
        return attemptModel.updateOne({_id:id},attempt);
    }
}