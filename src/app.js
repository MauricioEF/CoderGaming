import express from 'express';
import mongoose from 'mongoose';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

import videogamesRouter from './routes/VideogamesRouter.js';
import viewsRouter from './routes/ViewsRouter.js';
import librariesRouter from './routes/LibrariesRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import MessagesRouter from './routes/MessagesRouter.js';
import UsersRouter from './routes/UsersRouter.js';

import __dirname from './utils.js';
import config from './config/config.js';
import initializePassportStrategies from './config/passport.config.js';
import registerChatHandler from './listeners/chat.listener.js';


const app = express();

const PORT = config.app.PORT;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
const connection = mongoose.connect(config.mongo.URL);

const swaggerSpecOptions = {
    definition: {
        openapi:'3.0.1',
        info: {
            title:'CoderGaming docs',
            description: 'Aplicación como intento de réplica de Steam, Ecommerce de Videojuegos.'
        }
        },
        apis: [`${__dirname}/docs/**/*.yml`]
}

const swaggerSpec = swaggerJSDoc(swaggerSpecOptions);
app.use('/apidocs',swaggerUIExpress.serve,swaggerUIExpress.setup(swaggerSpec));

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

initializePassportStrategies();

app.use('/',viewsRouter);
app.use('/api/videogames',videogamesRouter);
app.use('/api/libraries',librariesRouter);
app.use('/api/sessions',SessionsRouter);
app.use('/api/messages',MessagesRouter);
app.use('/api/users',UsersRouter);

const io = new Server(server);

io.on('connection', socket =>{
    console.log(`Se conectó el socket ${socket.id}`)
    registerChatHandler(io,socket);
})