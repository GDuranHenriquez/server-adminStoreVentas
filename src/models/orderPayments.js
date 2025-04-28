const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orderPayments', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },    
    id_orden:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto_abonado_ucd:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    tasa_cambio_venta:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    monto_abonado_mlc:{
      type: DataTypes.REAL,
      allowNull: false,
    },
    fecha_abono:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_method:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    referencia:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },   
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'orderPayments'
  }
)}