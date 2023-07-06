import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import admin from './routes/admin.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import jamaahC from './routes/jamaah.js'
import db from './config/db.js';
import perkab from './routes/perkab.js'; 
import file from './routes/file.js';

const app = express();

(async()=>{
    await db.sync()
})()

app.use('/image',express.static('image'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: "https://hisar-lake.vercel.app",
    credentials: true
}))

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "welcome to hisar api"
    })
})
app.use(admin)
app.use(jamaahC)
app.use(perkab)
app.use(file)


app.listen(process.env.PORT,()=>{
    console.log('Server Running...')
})