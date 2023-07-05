import Perkab from "../model/perlengkapan.js";

export const getPerkab = async(req,res)=>{
    try {
        await Perkab.findOne({
            where: {
                jamaahId: req.body.id
            }
        }).then(response=>{
            res.status(200).json({
                data : response
            })
        }).catch(err=>{
           res.status(404).json({
            message : err
           })
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

export const editPerkab = async(req,res)=> {
    try {
        await Perkab.findOne({
            where: {
                jamaahId: req.body.id
            }
        }).then(async()=>{
            await Perkab.update({
                koper_dll: req.body.koper_dll,
                kain_batik: req.body.kain_batik,
                kain_ihram: req.body.kain_ihram,
                mukena: req.body.mukena,
                syal: req.body.syal,
                buku_panduan: req.body.buku_panduan,
                buku_doa: req.body.buku_doa,
                booklet_sholawat: req.body.booklet_sholawat,
                booklet_peta: req.body.booklet_peta
            },{
                where : {
                    jamaahId: req.body.id
                }
            }).then((respon)=>{
                res.status(200).json({
                    message: respon
                })
            })
        }).catch(err=>{
            res.status(404),json({
                message : err
            })
        })
    } catch (err) {
        res.status(404).json({
            message : err
        })
    }
}