import express, { Application, Router } from "express";
import mongoose from 'mongoose';
import expressConfig from "./frameworks/webserver/express";
import config from "./config";
import connection from "./frameworks/database/mongodb/connection";
import serverConfig from "./frameworks/webserver/server";
import routes from "./presentation/routes/routes";
import errorHandlingMiddleware from "./presentation/middleware/errorHandling";

import http, { Server as httpServerType } from 'http';
import { Server } from "socket.io";

import ioMiddleware from "./presentation/middleware/ioMiddleware";
import { SocketService } from "./Services/socketService";
import { UserController } from "./presentation/controllers/userController";
import { AuthRepository } from "./frameworks/database/mongodb/repository/authRepository";
import { NotoficationService } from "./Services/NotificationService";
import { NotificationRepository } from "./frameworks/database/mongodb/repository/NotiFicationRepo";


const app: Application = express();
const router: Router = express.Router()





const userRepo=new AuthRepository()

const notificationRepo=new NotificationRepository()

const notificationService=new NotoficationService(notificationRepo)

const socketService=new SocketService(userRepo,notificationService)


expressConfig(app,config)

routes(app,router)

connection(mongoose,config).connectToMongo()

app.use(errorHandlingMiddleware)

const httpServer:httpServerType = http.createServer(app);

const io = new Server(httpServer, {
  transports:['polling'],
  cors: {
    
    origin: ["http://localhost:5173", ""],
    methods: ["GET", "POST", "OPTIONS","PATCH","PUT"],
    credentials: true,
  },
});




app.use(ioMiddleware(io));

io.on("connection", socket => {
  console.log('New client connected');
  socket.on("disconnect", () => {
  });
  socketService.handleConnection(socket)
  
});




serverConfig(httpServer,config).startServer()