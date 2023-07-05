import  express from "express";
import { isAdmin, isAgen, isAll } from "../middleware/auth.js";
import { editPerkab, getPerkab } from "../controller/perkabController.js";

const perkab = express.Router()

perkab.post('/perkab', getPerkab)
perkab.put('/editPerkab', editPerkab)

export default perkab;