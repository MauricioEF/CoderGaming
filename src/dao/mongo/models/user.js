import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'user'
    },
    library: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Libraries'
    },
    membership:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Memberships'
    },
    sessionAttempts: {
        type:Number,
        default:0
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;
