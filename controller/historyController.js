import { Sequelize } from "sequelize";
import Riwayat from "../model/history.js";
import LoginHistory from "../model/loginHistory.js";
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

export const getAllLoginHistory = async(req,res)=>{
    try {
        await LoginHistory.findAll({
            limit: 5,
            order: [["login","DESC"]],
            where:{
                userId: req.body.id
            },attributes:{
                include:[
                    [
                        Sequelize.fn
                        (
                          "DATE_FORMAT", 
                          Sequelize.col("login"), 
                          "%Y-%m-%d/%H:%i WIB"
                        ),
                        "login",
                      ],
                      "userId"
                ]
            }
        }).then(respon=>{
            res.status(200).json({
                data: respon
            })
        })
    } catch (err) {
        res.status(400).json({
            message: "History Not Found!" + err
        })
    }
}