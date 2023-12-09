import LibrariesDao from "../dao/mongo/LibrariesDao.js";
import MessagesDao from "../dao/mongo/MessagesDao.js";
import UsersDao from "../dao/mongo/UsersDao.js";
import VideoGamesDao from "../dao/mongo/VideogamesDao.js";
import MembershipsDao from "../dao/mongo/MembershipDao.js";
import AttemptsDao from "../dao/mongo/AttemptsDao.js";

import LibrariesRepository from "./repositories/LibrariesRepository.js";
import MessagesRepository from "./repositories/MessagesRepository.js";
import UsersRepository from "./repositories/UsersRepository.js";
import VideogamesRepository from "./repositories/VideogamesRepository.js";
import MembershipsRepository from "./repositories/MembershipsRepository.js";
import AttemptsRepository from "./repositories/AttemptsRepository.js";


export const librariesService = new LibrariesRepository(new LibrariesDao());
export const messagesService = new MessagesRepository(new MessagesDao());
export const usersService = new UsersRepository(new UsersDao());
export const videogamesService = new VideogamesRepository(new VideoGamesDao());
export const membershipsService = new MembershipsRepository(new MembershipsDao());
export const attemptsService = new AttemptsRepository(new AttemptsDao());