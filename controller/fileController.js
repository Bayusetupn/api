import File from "../model/file.js";
import fs  from 'fs'

export const getFile = async(req,res) =>{
    try {
        await File.findOne({
            where: {
                jamaahId: req.params['id']
            }
        }).then(response=>{
            res.status(200).json({
                data : response
            })
        }).catch(err=>{
            res.status(404).json({
                message : "tidak ditemukan"
            })
        })
    } catch (err) {
        res.status(400).json({
            message : err
        })
    }
}

export const editDoc = async(req,res) =>{
    try {
        await File.findOne({
            where: {
                jamaahId: req.body.id
            }
        }).then(async(respon)=>{
            if (respon.ktp != null && req.files.ktp !== undefined) {
                fs.unlinkSync(`./${respon.ktp}`)
            }else if(respon.kk != null && req.files.kk !== undefined){
                fs.unlinkSync(`./${respon.kk}`)
            }else if(respon.passport != null && req.files.paspor !== undefined){
                fs.unlinkSync(`./${respon.passport}`)
            }else if(respon.foto != null && req.files.foto !== undefined){
                fs.unlinkSync(`./${respon.foto}`)
            }else if(respon.akteK != null && req.files.akteK !== undefined){
                fs.unlinkSync(`./${respon.akteK}`)
            }else if(respon.akteN != null && req.files.akteN !== undefined ){
                fs.unlinkSync(`./${respon.akteN}`)
            }
            try {
                await File.update({
                    ktp: req.files.ktp !== undefined? req.files.ktp[0].path : respon.ktp? respon.ktp:null,
                    kk: req.files.kk !== undefined? req.files.kk[0].path:respon.kk? respon.kk:null,
                    foto: req.files.foto !== undefined? req.files.foto[0].path:respon.foto? respon.foto:null,
                    passport: req.files.paspor !== undefined? req.files.paspor[0].path:respon.passport?respon.passport:null,
                    akteK: req.files.akteK !== undefined? req.files.akteK[0].path:respon.akteK?respon.akteK:null,
                    akteN: req.files.akteN !== undefined? req.files.akteN[0].path:respon.akteN?respon.akteN:null
                },{
                    where: {
                        jamaahId: req.body.id
                    }
                }).then(()=>{
                    res.status(200).json({
                        message : "succes"
                    })
                }).catch((err)=>{
                    res.status(404).json({
                        message : err
                    })
                })
            } catch (err) {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}