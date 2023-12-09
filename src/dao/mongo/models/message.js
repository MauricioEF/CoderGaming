import mongoose from "mongoose";


const collection = "Messages";

const schema = new mongoose.Schema({
    room:String,
    username:String,
    userId:String,
    body:String,

},{timestamps:true})

const messageModel = mongoose.model(collection,schema);

export default messageModel;