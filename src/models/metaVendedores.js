const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('metaVendedores', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },    
    id_vendedor:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meta_pedidos_ucd:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    meta_local_mlc:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    total_meta_pedidos:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    total_meta_local:{
      type: DataTypes.REAL,
      allowNull: false,
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
    tableName: 'metaVendedores'
  }
)}