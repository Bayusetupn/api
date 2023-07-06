import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPASSWORD,{
    host: process.env.DBHOST,
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: 20,
        min: 0,   
        idle: 30000,
    }
    
})

export default db;