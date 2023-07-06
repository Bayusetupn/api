import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import admin from './routes/admin.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import jamaahC from './routes/jamaah.js'
import db from './config/db.js';
import Perkab from './model/perlengkapan.js';
import perkab from './routes/perkab.js'; 
import file from './routes/file.js';
import fileUpload from 'express-fileupload';
import multer from 'multer';
import { uuid } from 'uuidv4';

const app = express();

(async()=>{
    await db.sync()
})()

app.use('/image',express.static('image'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(admin)
app.use(jamaahC)
app.use(perkab)
app.use(file)


app.listen(process.env.PORT,()=>{
    console.log('Server Running...')
})