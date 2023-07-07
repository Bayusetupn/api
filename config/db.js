import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize('byneql1ltzxvvuqweedr','ulz4x06y6kaxftrq','Cl1KCASUgfNRIyERFTI6',{
    host: "byneql1ltzxvvuqweedr-mysql.services.clever-cloud.com",
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: 20,
        min: 0,   
        idle: 30000,
    }
    
})

export default db;