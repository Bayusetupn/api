import express from "express";
import { getAllRiwayat } from "../controller/historyController.js";
import { isAll } from "../middleware/auth.js";

const riwayat = express.Router()

riwayat.post('/riwayat',getAllRiwayat)

export default riwayat

