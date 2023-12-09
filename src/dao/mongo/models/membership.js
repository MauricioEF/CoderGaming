import mongoose from 'mongoose';

const collection = "MemberShips";


const schema = new mongoose.Schema({
    type: String,
    status:{
        type:String,
        default:'active'
    },
    expiresAt:Date
},{timestamps:true});

const membershipModel = mongoose.model(collection,schema);

export default membershipModel;