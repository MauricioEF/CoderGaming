import { librariesService } from "../services/repositories.js";

const librarySetter = async(req,res,next) => {
    // if(req.user&&req.cookies.library){ // OPCIONAL
    //     res.clearCookie('library');
    //     return next();
    // }
    if(!req.cookies.library&&!req.user) {
        const library = await  librariesService.createLibrary();
        res.cookie('library',library._id.toString())
    }
    next();
}

export default librarySetter;