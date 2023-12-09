import CloudStorageService from '../services/CloudStorageService.js';
import { usersService, videogamesService } from "../services/repositories.js";

const getVideogames = async(req,res)=>{
    const videogames = await videogamesService.getVideogames();
    res.send({status:"success",payload:videogames})
}

const createVideogame = async(req,res)=>{
    const {
        title,
        description,
        price,
        categories
    } = req.body;
    //Las imágenes van a vivir en req.files
    //El resto de datos, en req.body
    if(!title||!description||!price) return res.status(400).send({status:"error", error:"Incomplete values"});
    //Construyo el objeto videojuego
    const newVideogame = {
        title,
        description,
        price,
        categories
    }

    const googleStorageService = new CloudStorageService();
    const images = [];

    for(const file of req.files){
        const url = await googleStorageService.uploadFileToCloudStorage(file);
        images.push(url);
    }

    newVideogame.images = images;

    if(req.user.role==="premium"){//Lo está creando un usuario
        const user = await usersService.getUserBy({_id:req.user.id});
        newVideogame.owner = user.email
    }else{
        newVideogame.owner = "admin"
    }
    //Ya creé el objeto, ya mapeé las imágenes, ahora sí, inserto en la base
     const result = await videogamesService.createVideogame(newVideogame);
     console.log(result);
    res.send({status:"success",payload:result._id});
}

const updateVideogame = async (req,res)=>{
    const {vid} = req.params;
    const {
        title,
        description,
        price,
        categories
    } = req.body;
    //¿Tendría que validar algún campo? ¡NO!
    //Construir el objeto de actualización
    const updateVideogame = {
        title,
        description,
        price,
        categories
    }

    //Oye! El videojuego existe?
    const videogame = await videogamesService.getVideogameBy({_id:vid});
    if(!videogame) return res.status(400).send({status:"error",error:"Videogame doesn't exist"});
    await videogamesService.updateVideogame(vid,updateVideogame);
    res.send({status:"success",message:"Videogame updated"});

}

const deleteVideogame = async (req,res)=>{
    const {vid} = req.params;
    const result = await videogamesService.deleteVideogame(vid);
    res.send({status:"success",message:"Videogame Deleted"})
}

export default {
    createVideogame,
    deleteVideogame,
    getVideogames,
    updateVideogame,
}