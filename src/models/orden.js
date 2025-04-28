const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orden', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },    
    id_cliente:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ubicacionDepartamento:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_vendedor:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero_orden:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_orden:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    total_abonado:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    total_pendiente:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    status_pago:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_orden:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delete:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },   
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'orden'
  }
)}