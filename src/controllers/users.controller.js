import { DateTime } from "luxon";
import jwt from 'jsonwebtoken';
import UserDTO from "../dto/User/User.js";
import { membershipsService, usersService } from "../services/repositories.js";
import config from "../config/config.js";


const upgradeUser = async(req,res)=>{
    const {type} = req.query;
    const user = await usersService.getUserBy({_id:req.user.id});
    if(!user) return res.sendBadRequest("User doesn't exist");
    //Crear la nueva membresía
    const membership = await membershipsService.createMembership({
        type,
        expiresAt:DateTime.now().plus({months:1}).toISODate()
    })
    await usersService.updateUser(user._id,{role:'premium',membership:membership._id});
    //Regenerar el token con el rol actualizado, y refrescar su cookie

    const tokenizedUser = UserDTO.getTokenDTOFrom({...user,role:'premium'});
    const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:'1d'});
    res.cookie(config.jwt.COOKIE,token);
    res.render('UserUpgraded');
}


const expireMembership = async(req,res)=>{
    const memberships = req.body;
    console.log(memberships);
    try{
        await membershipsService.bulkUpdate(memberships,{status:'expired'});
    }catch(error){
        console.log(error);
    }
    
    res.sendStatus(200);
}

export default {
    upgradeUser,
    expireMembership
}