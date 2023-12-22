
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/DB.js');


class Note extends Model {}
Note.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    }
},{
    sequelize,
    modelName: 'note'
})




module.exports = Note;