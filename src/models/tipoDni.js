const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  sequelize.define('tipoDni', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },
    tipo:{
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'tipoDni'    
  })
}