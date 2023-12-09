import mongoose from "mongoose";

const collection = "Libraries";

const videogameSubschema = new mongoose.Schema({
    videogame:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Videogames'
    },
    added:Date
},{_id:false})

const schema = new mongoose.Schema({
    videogames: [ videogameSubschema ]
}, {timestamps:true})

// schema.pre(['find','findOne'],function(){
//     this.populate('videogames.videogame')
// })

const libraryModel =  mongoose.model(collection,schema);

export default libraryModel;