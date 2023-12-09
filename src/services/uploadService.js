import multer from "multer";
import __dirname from "../utils.js";


//ALMACENAMIENTO EN DISCO
// const storage = multer.diskStorage({
//     //Aquí va el QUÉ, el CÓMO y el DÓNDE se guarda
//     destination:function(req,file,callback){
//         return callback(null,`${__dirname}/public/img`);
//     },
//     filename:function(req,file,callback){
//         return callback(null,`${Date.now()}-${file.originalname}`)
//     }
// })

//Multer ya no tiene presencia en archivo, SÓLO EN MEMORIA
const storage = multer.memoryStorage();


//Ya tengo el almacenamiento, ahora sí, el uploader (Cargador)

const uploader = multer({storage});

export default uploader;