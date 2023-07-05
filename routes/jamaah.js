import { Alljamaah, berangkat, getAllJamaah, getJamaah, hapusJamaah, jamaahDp, jamaahku, tambahJamaah } from "../controller/jamaahController.js";
import  express from "express";
import { isAdmin, isAgen, isAll } from "../middleware/auth.js";

const jamaah = express.Router()

jamaah.post('/jamaah', getAllJamaah)
jamaah.get('/jamaah/all',Alljamaah)
jamaah.get('/jamaahku', jamaahku)
jamaah.post('/jamaah/hapus', hapusJamaah)
jamaah.post('/jamaah/tambah', tambahJamaah)
jamaah.get('/jamaah/:id', isAgen, getJamaah)
jamaah.put('/jamaah/dp/',isAdmin, jamaahDp)
jamaah.put('/jamaah/berangkat', isAdmin,berangkat)

export default jamaah;