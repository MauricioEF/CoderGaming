import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import MailerService from '../services/MailerService.js';
import DMailTemplates from '../constants/DMailTemplates.js';
import UserDTO from '../dto/User/User.js';
import authService from '../services/authService.js';
import { attemptsService, usersService } from '../services/repositories.js';


const register = async(req,res)=>{
    try{
    //Enviar un correo de bienvenida
    const mailService = new MailerService();
    const result = await mailService.sendMail([req.user.email],DMailTemplates.WELCOME,{user:req.user})
    }catch(error){
        console.log(`Falló envío de correo para ${req.user.email}`)
    }

    res.clearCookie('library');
    res.sendSuccess('Registered');
}

const login = async(req,res)=>{
    const tokenizedUser = UserDTO.getTokenDTOFrom(req.user);
    const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:'1d'});
    res.cookie(config.jwt.COOKIE,token);
    res.clearCookie('library');
    res.sendSuccess('Logged In');
}

const applyGoogleCallback = async (req,res)=>{
    try{
        //Enviar un correo de bienvenida
        const mailService = new MailerService();
        const result = await mailService.sendMail([req.user.email],DMailTemplates.WELCOME,{user:req.user})
        }catch(error){
            console.log(`Falló envío de correo para ${req.user.email}`)
    }
    const tokenizedUser = UserDTO.getTokenDTOFrom(req.user);
    const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:'1d'});
    res.cookie(config.jwt.COOKIE,token);
    res.clearCookie('library');
    res.sendSuccess('Logged In');
}


const current = async(req,res)=>{
    console.log(req.user);
    res.sendSuccessWithPayload(req.user);
}

const passwordRestoreRequest = async(req,res)=>{
    const {email} = req.body;
    const user = await usersService.getUserBy({email});
    if(!user) return res.sendBadRequest("User doesn't exist");
    const token = jwt.sign({email},config.jwt.SECRET,{expiresIn:'1d'});
    const mailerService = new MailerService();
    const result = await mailerService.sendMail([email],DMailTemplates.PWD_RESTORE,{token});
    res.sendSuccess("Email sent");
}

const restorePassword = async(req,res)=>{
    const {newPassword, token} = req.body;
    if (!newPassword || !token) return res.sendBadRequest('Incomplete values');
    try{
        //El token es válido?
        const {email} = jwt.verify(token,config.jwt.SECRET);
        //El usuario sí está en la base?
        const user = await usersService.getUserBy({email});
        if(!user) return res.sendBadRequest("User doesn't exist");
        //¿No será la misma contraseña que ya tiene?
        const isSamePassword = await authService.validatePassword(newPassword,user.password);
        if(isSamePassword) return res.sendBadRequest("New Password Cannot be equal to Old Password");
        //Hashear mi nuevo password
        const hashNewPassword = await authService.createHash(newPassword);
        await usersService.updateUser(user._id,{password:hashNewPassword});
        res.sendSuccess();

    }catch(error){
        console.log(error);
        res.sendBadRequest('Invalid token');
    }
}

const checkAttemptStatus = async(req,res)=>{
    //Consulta si hay alguna Ip bloqueada (blacklist) gracias a sus intentos fallidos.
    const address = req.headers['x-forwarded-for']||req.connection?.socket?.remoteAddress||req.socket.remoteAddress;
    req.logger.debug(address);
    //Tengo que corroborar si la dirección ya está siendo cargada en mi lista negra
  
    const attempt = await attemptsService.getAttemptBy({ipAddress:address});
    if(!attempt){
        //Significa que el cliente no ha tenido problemas recientes de intentos de login
        return res.sendSuccessWithPayload({valid:true,attempt});
    }else{
        //El Cliente sí estaba en la lista negra, verifico si ya rebasó los intentos
        const valid = attempt.failures<5;
        
        return res.sendSuccessWithPayload({valid,attempt});
    }
}

export default {
    applyGoogleCallback,
    checkAttemptStatus,
    current,
    login,
    passwordRestoreRequest,
    register,
    restorePassword
}