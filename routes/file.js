import  express from "express";
import { editDoc, getFile } from "../controller/fileController.js";
import { setImage } from "../controller/userController.js";
import multer from 'multer';
import { uuid } from 'uuidv4';

const DIR = './image'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
})

const upload = multer({
    storage: storage,
})

const file = express.Router()

file.get('/file/:id', getFile)

file.put('/file/edit',upload.fields([
    {name: 'ktp',maxCount: 1},
    {name: 'kk',maxCount: 1},
    {name: 'paspor',maxCount: 1},
    {name: 'foto',maxCount: 1},
    {name: 'akteK',maxCount: 1},
    {name: 'akteN', maxCount: 1}
]), editDoc)

export default file;