import { Sequelize } from "sequelize";

const db = new Sequelize('db_hisar','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: 20,
        min: 0,   
        idle: 20000,
    }
    
})

export default db;