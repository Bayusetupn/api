import express from "express";
import { getAllLoginHistory, getAllRiwayat } from "../controller/historyController.js";
import { isAdmin, isAll } from "../middleware/auth.js";

const riwayat = express.Router()

riwayat.post('/riwayat',getAllRiwayat)
riwayat.post('/riwayat/login',isAdmin,getAllLoginHistory)

export default riwayat

