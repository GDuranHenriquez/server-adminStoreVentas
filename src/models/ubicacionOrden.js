const { DataTypes } = require('sequelize');

//ubicación del producto de las rdenes
module.exports = (sequelize) =>{
  sequelize.define('ubicacionOrden', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },
    nombre_referencia:{
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'ubicacionOrden'    
  })
}