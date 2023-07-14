import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import admin from './routes/admin.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import jamaahC from './routes/jamaah.js'
import perkab from './routes/perkab.js';
import file from './routes/file.js';
import { isAll } from './middleware/auth.js';
import path,{dirname} from 'path'
import Riwayat from './model/history.js';
// import sessions from 'express-session';
import { fileURLToPath } from 'url';
import db from './config/db.js';
const app = express();
//(async () => {
    //await db.sync()
//})()

// app.use(sessions({
//     saveUninitialized: true,
//     cookie: {maxAge: 1000 * 60 * 60 * 24,httpOnly: false,sameSite: false },
//     secret: "kukuruyuk",
//     resave: true,
// }))
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/image', express.static(path.join(__dirname,'image')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "https://hisar.my.id",
    credentials: true
}))


app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome to hisar api"
    })
})
app.use(admin)
app.use(jamaahC)
app.use(perkab)
app.use(file)


app.listen(process.env.PORT, () => {
    console.log('Server Running...')
    
})


