import { librariesService, videogamesService } from "../services/repositories.js";


const getLibrary = async(req,res)=>{
    const {lid} = req.params;
    const library = await librariesService.getLibraryBy({_id:lid});
    if(!library) return res.status(404).send({status:"error",error:"Library not found"});
    res.send({status:"success",payload:library})
}

const createLibrary = async(req,res)=>{
    const result = await librariesService.createLibrary();
    res.send({status:"success",payload:result._id});
}

const insertVideogameWithLibraryId = async(req,res)=>{
    const {lid,vid} = req.params;
    const library = await librariesService.getLibraryBy({_id:lid});
    if(!library) return res.status(400).send({status:"error",error:"Library doesn't exist"});
    const videogame = await videogamesService.getVideogameBy({_id:vid});
    if(!videogame) return res.status(400).send({status:"error",error:"Videogame doesn't exist"})
    const videogameExistsInLibrary = library.videogames.find(item=>{
        return item.videogame.toString() === vid;
    })
    if(videogameExistsInLibrary) return res.status(400).send({status:"error",error:"Videogame is Already in library"});
    library.videogames.push({
        videogame:vid,
        added:new Date().toISOString()
    })
    await librariesService.updateLibrary(lid,{videogames:library.videogames});
    res.send({status:"success",message:"Videogame Added"})
}

const insertVideogameWithUser = async(req,res)=>{
    const {vid} = req.params;
    const library = await librariesService.getLibraryBy({_id:req.user.library});
    if(!library) return res.status(400).send({status:"error",error:"Library doesn't exist"});
    const videogame = await videogamesService.getVideogameBy({_id:vid});
    if(!videogame) return res.status(400).send({status:"error",error:"Videogame doesn't exist"})
    const videogameExistsInLibrary = library.videogames.find(item=>{
        return item.videogame.toString() === vid;
    })
    if(videogameExistsInLibrary) return res.status(400).send({status:"error",error:"Videogame is Already in library"});
    library.videogames.push({
        videogame:vid,
        added:new Date().toISOString()
    })
    await librariesService.updateLibrary(req.user.library,{videogames:library.videogames});
    res.send({status:"success",message:"Videogame Added"})
}

export default {
    createLibrary,
    getLibrary,
    insertVideogameWithLibraryId,
    insertVideogameWithUser
}