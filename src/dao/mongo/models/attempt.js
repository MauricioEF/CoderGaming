import mongoose from "mongoose";

const collection = 'Attempts';

const schema =  new mongoose.Schema({
    ipAddress: String,
    failures:Number,
    expiresAt:Date
})

const attemptModel = mongoose.model(collection,schema);

export default attemptModel;