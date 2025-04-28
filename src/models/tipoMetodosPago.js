const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  sequelize.define('tipoMetodosPago', {
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
    },
    nombre:{
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'tipoMetodosPago'    
  })
}