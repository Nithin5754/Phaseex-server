import express, { Application } from "express";
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import { ConfigType } from "../../config";
import cors from 'cors'


import { v2 as cloudinary } from "cloudinary";





export default function expressConfig(app:Application,config:ConfigType){

  app.use(cors({
    origin: ['https://www.phaseex.live','https://phaseex.live','http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

cloudinary.config({
  cloud_name:config.cloudinary.CLOUDINARY_CLOUD_NAME,
  api_key:config.cloudinary.CLOUDINARY_API_KEY,
  api_secret:config.cloudinary.CLOUDINARY_API_SECRET
})

  app.use(morgan('dev'))
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieSession({ signed: false, secure: false }))
  app.use(helmet({ xssFilter: true }))
  app.use(mongoSanitize())
}