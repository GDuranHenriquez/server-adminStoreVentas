const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  sequelize.define('usuario', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },
    nombre:{
      type: DataTypes.STRING ,
      allowNull: false
    },
    correo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion:{
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono:{
      type: DataTypes.STRING,
      allowNull: false
    },
    dni:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    level:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    delete:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'usuario'    
  })
}