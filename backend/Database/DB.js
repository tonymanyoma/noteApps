const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: 'localhost',
   dialect: 'mysql'
 });


 try {
   sequelize.authenticate();
   console.log('Connection has been established successfully to cryptocurrency');
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }

 module.exports = sequelize; 

