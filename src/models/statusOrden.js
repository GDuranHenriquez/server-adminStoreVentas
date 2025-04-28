const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  sequelize.define('statusOrden', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },
    name_reference:{
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
    tableName: 'statusOrden'    
  })
}