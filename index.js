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
// import sessions from 'express-session';

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

app.use('/image', express.static('image'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
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


