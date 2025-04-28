const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('detalleOrden',{
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
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion:{
      type: DataTypes.STRING(512),      
      allowNull: true
    },
    link_item:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagen_path:{
      type: DataTypes.STRING,
      allowNull: true
    },
    numero_items:{
      type: DataTypes.REAL,
      allowNull: false
    }, 
    monto_unitario_ucd:{
      type: DataTypes.REAL,
      allowNull: false,
    },    
    totalUCD:{
      type: DataTypes.REAL,
      allowNull: false
    },
    iva:{
      type: DataTypes.REAL,
      allowNull: false
    },
    ubicacion:{
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
    tableName: 'detalleOrden'
  })
}