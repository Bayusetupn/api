import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize('u7664108_db_hisar','u7664108_admin','u7664108_db_hisar',{
    host: "api-hisar.fullsnackdesigner.com",
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: 20,
        min: 0,   
        idle: 30000,
    }
    
})

export default db;