import Jamaah from "../model/Jamaah.js";
import File from '../model/file.js';
import Perkab from '../model/perlengkapan.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../model/user.js";
import { Sequelize } from "sequelize";
dotenv.config()

export const getAllJamaah = async (req, res) => {
    try {
        const data = await Jamaah.findAll({
            where: {
                userId: req.body.id
            }
        })
        if (data) {
            res.status(200).json({
                data: data
            })
        } else {
            res.status(404).json({
                status: "not Found"
            })
        }
    } catch (err) {
        res.status(404).json({ errs: err })
    }
}

export const jamaahku = async (req, res) => {
    const token = await req.cookies._auth
    try {
        jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
            await Jamaah.findAll({
                where: {
                    userId: decode.id
                }
            }).then(response => {
                res.status(200).json({
                    data: response
                })
            }).catch(err => {
                res.status(404).json({
                    message: err
                })
            })
        })
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}

export const Alljamaah = async (req, res) => {
    try {
        await Jamaah.findAll().then(respon=>{
            res.status(200).json({
                dataJamaah : respon
            })
        }).catch(err=>{
            res.status(404).json({
                message: "not found"
            })
        })
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}

export const getJamaah = async (req, res) => {
    try {
        await Jamaah.findOne({
            where: {
                id: req.params['id']
            }
        }).then(res => {
            res.status(200).json({
                data: res
            })
        }).catch(err => {
            res.status(404).json({
                status: err
            })
        })
    } catch (err) {

    }
}

export const hapusJamaah = async(req,res)=>{
    const token = req.cookies._auth
    try {
        jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
            await User.findOne({
                where: {
                    id: decode.id
                }
            }).then(respon=>{
                respon.decrement('total_jamaah',{by:1})
            })
                await Perkab.findOne({
                    where: {
                        jamaahId: req.body.id
                    }
                }).then(async(responn)=>{
                    await Perkab.destroy({
                        where:{
                            id: responn.id
                        }
                    })
                })
                await File.findOne({
                    where:{
                        jamaahId: req.body.id
                    }
                }).then(async(responnn)=>{
                    await File.destroy({
                        where:{
                            id: responnn.id
                        }
                    })
                })
                await Jamaah.destroy({
                    where:{
                        id: req.body.id
                    }
                })
            })
    } catch (err) {
        res.status(400).json({
            message : err
        })
    }
}

export const tambahJamaah = async (req, res) => {
    const token = await req.cookies._auth
    try {
        jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
            await User.findOne({
                where:{
                    id: decode.id
                }
            }).then(async(user)=>{
                await Jamaah.create({
                    userId: decode.id,
                    daftarkan: user.nama,
                    nama: req.body.nama,
                    ktp: req.body.ktp,
                    jenis_kelamin: req.body.jenis_kelamin,
                    no_telepon: req.body.no_telepon,
                    alamat: req.body.alamat,
                    paket: req.body.paket
                }).then(async(respon)=>{
                    await File.create({
                        jamaahId: respon.id
                    })
                    await Perkab.create({
                        jamaahId: respon.id
                    })
                    await User.update({
                        total_jamaah: Sequelize.literal('total_jamaah + 1')
                    },{
                        where:{
                            id: decode.id
                        }
                }).catch(err=>{
                    res.status(400).json({
                        message : err
                    })
                })
            })
            }).catch(err=>{
                res.status(400).json({
                    message : "No Ktp Sudah Terdaftar!"
                })
            })
        })
    } catch (err) {
        res.status(400).json({
            message : "Server Error"
        })
    }
}

export const berangkat = async (req, res) => {
    try {
        const jamaah = await Jamaah.findOne({
            where: {
                id: req.body.id
            }
        })
        console.log(jamaah)
        if (jamaah) {
            await Jamaah.update({
                berangkat: req.body.berangkat
            }, {
                where: {
                    id: req.body.id,
                }
            }).then(respon => {
                res.status(200).json({
                    message: "succes"
                })
            })
        } else {
            res.status(404).json({
                message: "Jamaah Not Found!"
            })
        }
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}

export const jamaahDp = async (req, res) => {
    try {
        const jamaah = await Jamaah.findOne({
            where: {
                id: req.body.id
            }
        })
        console.log(jamaah)
        if (jamaah) {
            await Jamaah.update({
                dp: 1
            }, {
                where: {
                    id: req.body.id,
                    dp: 0
                }
            }).then(respon => {
                res.status(200).json({
                    message: "succes"
                })
            })
        } else {
            res.status(404).json({
                message: "Jamaah Not Found!"
            })
        }
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}