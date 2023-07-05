import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/user.js'
dotenv.config()

export const isAll = async (req,res,next)=>{
    const token = await req.cookies._auth
        jwt.verify(token,process.env.SECRETKEY,async(err,decode)=>{
            console.log(token,err)
            var role = await User.findOne({where :{
                id: decode.id
            }})
            if (role.nama != '') {
                 res.status(200).json({
                    "response" : role.nama,
                    "foto" : role.foto
                })
            } else {
                 res.status(404).json({
                    "response" : "User Tidak Ditemukan !"
                })
            }
            next()
        })
        
}

export const isAgen = async (req,res,next)=>{
    const token = await req.cookies._auth
        jwt.verify(token,process.env.SECRETKEY,async(err,decode)=>{
            console.log(token,err)
            var role = await User.findOne({where :{
                id: decode.id
            }})
            if (role.role !== "agen" && role.role !== "admin") {
                return res.json({
                    "message" : "Anda Tidak memiliki akses!"
                })
            }
            next()
        })
}

export const isAdmin = async (req,res,next)=>{
    const token = await req.cookies._auth
        try {
            jwt.verify(token,process.env.SECRETKEY,async(err,decode)=>{
                console.log(token,err)
                var role = await User.findOne({where :{
                    id: decode.id
                }})
                if (role.role !== "admin") {
                    return res.json({
                        "message" : "Anda Tidak memiliki akses!"
                    })
                }
                next()
            })
        } catch (err) {
            res.status(404).json({
                message : err
            })
        }
}

export const AdminProf = async (req,res,next)=>{
    const token = await req.cookies._auth
        jwt.verify(token,process.env.SECRETKEY,async(err,decode)=>{
            console.log(token,err)
            var role = await User.findOne({where :{
                id: decode.id
            }})
            if (role.role !== "admin") {
                return res.json({
                    "message" : "Anda Tidak memiliki akses!"
                })
            }else{
                res.status(200).json({
                    "nama" : role.nama,
                    "username" : role.username
                })
            }
            next()
        })
}

export const isUstad = async (req,res,next)=>{
    const token = await req.cookies._auth
        jwt.verify(token,process.env.SECRETKEY,async(err,decode)=>{
            var role = await User.findOne({where :{
                id: decode.id
            }})
            if (role.role !== "ustad" && role.role !== "admin") {
                return res.json({
                    "message" : "Anda Tidak memiliki akses!"
                })
            }
            next()
        })
}
