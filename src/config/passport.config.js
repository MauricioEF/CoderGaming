import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt} from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { usersService,librariesService, attemptsService } from "../services/repositories.js";
import authService from "../services/authService.js";
import config from "./config.js";

const initializePassportStrategies = () =>{

    passport.use('register', new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false},
    async (req,email, password, done)=>{
      try {
        const {firstName, lastName} = req.body;
        if(!firstName||!lastName) return done(null,false,{message:'Incomplete values'});
        //Corroborar que el usuario no exista.
        const exists  = await usersService.getUserBy({email});
        if(exists) return done(null,false,{message:'User already exists'});
        //Antes de crear al usuario, necesito aplicar un hash a su contraseña
        const hashedPassword = await authService.createHash(password);
        //Ahora sí creo al usuario
        const newUser = {
            firstName,
            lastName,
            email,
            password:hashedPassword
        }

        //Revisar la librería temporal
        let library;

        if(req.cookies['library']){//Obtener la que ya está de la cookie
            library = req.cookies['library'];
        }else{ //Crear una nueva librería en la base de datos
            const libraryResult = await librariesService.createLibrary();
            library = libraryResult._id
        }
        newUser.library = library;

        const result = await usersService.createUser(newUser);
        return done(null,result);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }));
    
    passport.use('login', new LocalStrategy({usernameField:'email', session:false, passReqToCallback:true}, async(req,email,password,done)=>{
        try{
            if(email===config.app.ADMIN_EMAIL&&password===config.app.ADMIN_PASSWORD){
                const adminUser = {
                    role:'admin',
                    id:'0',
                    firstName:'admin'
                }
                return done(null,adminUser);
            }
            //Aquí el usuario sí debería existir, corroborar primero.
            const user = await usersService.getUserBy({email});
            if(!user) {
                const address =  req.headers['x-forwarded-for']||req.connection?.socket?.remoteAddress||req.socket.remoteAddress;
                const attempt = await attemptsService.getAttemptBy({ipAddress:address});
                if(attempt){
                    //Ya había intentado más de una vez, lo que significa, que en lugar de crear un intento, sólo lo actualizo
                    await attemptsService.updateAttempt(attempt._id,{failures:++attempt.failures});
                }else{
                    await attemptsService.createAttempt({
                        ipAddress:address,
                        failures:1
                    })
                }
                return done(null,false,{message:'Invalid Credentials'});
            }
            //Ahora toca validar su contraseña, ¿es equivalente?
            const isValidPassword = await authService.validatePassword(password,user.password);
            if(!isValidPassword) {
                const address =  req.headers['x-forwarded-for']||req.connection?.socket?.remoteAddress||req.socket.remoteAddress;
                const attempt = await attemptsService.getAttemptBy({ipAddress:address});
                if(attempt){
                    //Ya había intentado más de una vez, lo que significa, que en lugar de crear un intento, sólo lo actualizo
                    await attemptsService.updateAttempt(attempt._id,{failures:++attempt.failures});
                }else{
                    await attemptsService.createAttempt({
                        ipAddress:address,
                        failures:1
                    })
                }
                await usersService.updateUser(user._id,{sessionAttempts:++user.sessionAttempts});
                return done(null,false,{message:'Invalid Credentials'})
            }
            return done(null,user);
        }catch(error){
            console.log(error);
            return done(error);
        }
    }));

    passport.use('google',new GoogleStrategy({
        clientID:config.google.CLIENT,
        clientSecret:config.google.SECRET,
        callbackURL:'http://localhost:8080/api/sessions/googlecallback',
        passReqToCallback:true
    },async (req,accessToken,refreshToken,profile,done)=>{
        const {_json} = profile;
        const user = await usersService.getUserBy({email:_json.email});
        if(user) {
            return done(null, user);
        }else{
            const newUser = {
                firstName:_json.given_name,
                lastName:_json.family_name,
                email:_json.email
            }
            let library;

            if(req.cookies['library']){//Obtener la que ya está de la cookie
                library = req.cookies['library'];
            }else{ //Crear una nueva librería en la base de datos
                libraryResult = await librariesService.createLibrary();
                library = libraryResult._id
            }
            newUser.library = library;

            const result = await  usersService.createUser(newUser);
            done(null,result);
        }
    }))


    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([authService.extractAuthToken]),
        secretOrKey:'jwtSecret'
    }, async(payload, done)=>{
        return done(null,payload);
    }))

}

export default initializePassportStrategies;