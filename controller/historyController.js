import Riwayat from "../model/history.js";

export const getAllRiwayat = async(req,res) =>{
    try {
        await Riwayat.findAll({
            where:{
                jamaahId: req.body.id
            }
        }).then(ress=>{
            res.status(200).json({
                data : ress
            })
        })
    } catch (err) {
        res.status(404).json({
            error : err
        })
    }
}