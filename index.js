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

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://hisar-a0cxe64z4-bayu3541732.vercel.app/"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

app.use(cors({
    origin: "https://hisar-a0cxe64z4-bayu3541732.vercel.app/",
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