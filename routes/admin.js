import express from 'express'
import { AdminProf, isAdmin, isAgen, isAll, isUstad } from '../middleware/auth.js';
import {Login, createAgen, createUstad, deleteAgen, deleteUstad, editAdmin, editAgen, editManager, editUstad, fotoAgen, getAgenById, getAllAgen, getAllUstad, getUstadById, me, setImage} from '../controller/userController.js'
import multer from 'multer';
import { uuid } from 'uuidv4';
import { addPromo, deletePromo, getAllPromo } from '../controller/promoController.js';

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

const router = express.Router();

router.post('/login',Login)
router.get('/user', isAll)
router.get('/admin',isAdmin,AdminProf)
router.put('/admin/edit',editAdmin)
router.put('/manager/edit',editManager)
router.post('/profilePic', upload.single('image'),setImage )
//promo
router.post('/upload/promo', upload.single('promo'),addPromo)
router.post('/delete/promo',deletePromo)
router.get('/promo',getAllPromo)
//agen
router.get('/agen/me', isAgen,me)
router.get('/agen',isAgen,getAllAgen);
router.get('/fotoAgen/:id', isAgen,fotoAgen)
router.post('/agen/create',isAdmin ,createAgen)
router.get('/agen/:id', isAgen,getAgenById)
router.put('/agen/edit', isAgen, editAgen)
router.post('/agen/delete', isAdmin, deleteAgen)
//ustad
router.get('/ustad/me', isUstad, me)
router.get('/ustad',isUstad,getAllUstad);
router.get('/ustad/:id',isUstad,getUstadById)
router.post('/ustad/create',isAdmin,createUstad)
router.put('/ustad/edit',editUstad)
router.post('/ustad/delete', isAdmin, deleteUstad)

export default router;