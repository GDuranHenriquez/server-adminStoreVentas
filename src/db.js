require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE
} = process.env;

const dialectOptionsLocalHost = {
  useUTC: '+00:00', // for reading from database
}

const dialectOptionsAWS = {
  useUTC: '+00:00', // for reading from database
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

const sslDB = DB_HOST === 'localhost' ? dialectOptionsLocalHost : dialectOptionsAWS

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ...sslDB
  },
  timezone: '+00:00',
  define: {
    freezeTableName: true, // Evitar que Sequelize pluralice automáticamente el nombre de la tabla
  }
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);

sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { StatusPagos, StatusOrden, UbicacionOrden, Categoria, Producto, Presentacion, Cliente, DetalleVenta, TazaDolar, TipoDni, Usuario, Venta, Departamento, Orden, DetalleOrden } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//Esto añade funciones como, Videogame.addGenres, VideoGame.getGenres... etc...
//Producto =>
Producto.belongsTo(Presentacion, { as: 'ProductoPresentacion', foreignKey: 'presentacion', timestamps: false, createdAt: false, updatedAt: false});
Producto.belongsTo(Departamento, { as: 'ProductoDepartamento', foreignKey: 'departamento', timestamps: false, createdAt: false, updatedAt: false});
Producto.belongsToMany(Categoria, { through: 'ProductoCategoria', timestamps: false, createdAt: false, updatedAt: false});
/* Producto.hasMany(DetalleVenta, { as: 'ProductoDetalleVenta', foreignKey: 'producto_detalleVenta', timestamps: false, createdAt: false, updatedAt: false}); */

//CategoriaPresentacion
Categoria.belongsToMany(Producto, { through: 'ProductoCategoria', timestamps: false, createdAt: false, updatedAt: false});
Presentacion.hasMany(Producto, { as: 'ProductoPresentacion', foreignKey: 'presentacion', timestamps: false, createdAt: false, updatedAt: false});
Departamento.hasMany(Producto, { as: 'ProductoDepartamento', foreignKey: 'departamento', timestamps: false, createdAt: false, updatedAt: false});

//Venta =>
Venta.hasMany(DetalleVenta, { as: 'detalleVenta', foreignKey: 'idDetalleVenta', timestamps: false, createdAt: false, updatedAt: false});
Venta.belongsTo(Cliente, {as: 'venta_cliente', foreignKey:'ventaCliente', timestamps: false, createdAt: false, updatedAt: false})
Venta.belongsTo(Usuario, {as: 'venta_usuario', foreignKey:'ventaUsuario', timestamps: false, createdAt: false, updatedAt: false})
Venta.belongsTo(Departamento, { as: 'venta_departamento', foreignKey: 'ventaDepartamento', timestamps: false, createdAt: false, updatedAt: false});

//Usuario, Cliente =>
Cliente.hasMany(Venta, { as: 'Cliente_Venta', foreignKey: 'clienteVenta', timestamps: false, createdAt: false, updatedAt: false});
Usuario.hasMany(Venta, { as: 'usuario_venta', foreignKey: 'usuarioVenta', timestamps: false, createdAt: false, updatedAt: false});
Departamento.hasMany(Venta, { as: 'departamento_venta', foreignKey: 'ventaDepartamento', timestamps: false, createdAt: false, updatedAt: false});
Cliente.belongsTo(TipoDni, {as: 'cliente_tipoDni', foreignKey:'clienteTipoDni', timestamps: false, createdAt: false, updatedAt: false})
Usuario.belongsTo(TipoDni, {as: 'usuario_tipoDni', foreignKey:'usuarioTipoDni', timestamps: false, createdAt: false, updatedAt: false})

//DetalleVenta
DetalleVenta.belongsTo(Producto, { foreignKey:'productId', as: 'producto', timestamps: false, createdAt: false, updatedAt: false})
DetalleVenta.belongsTo(Venta, {as: 'venta', foreignKey:'idVenta', timestamps: false, createdAt: false, updatedAt: false})
DetalleVenta.belongsTo(TazaDolar, {as: 'tasaDolar', foreignKey:'idTasaDolar', timestamps: false, createdAt: false, updatedAt: false})

//Orden
Orden.hasMany(DetalleOrden, { as: 'detalleOrden', foreignKey: 'idOrden', timestamps: false, createdAt: false, updatedAt: false});
Orden.belongsTo(Cliente, {as: 'orden_cliente', foreignKey:'ordenCliente', timestamps: false, createdAt: false, updatedAt: false})
Orden.belongsTo(Usuario, {as: 'orden_usuario', foreignKey:'ordenUsuario', timestamps: false, createdAt: false, updatedAt: false})
Orden.belongsTo(StatusPagos, {as: 'orden_statusPago', foreignKey:'ordenStatusPago', timestamps: false, createdAt: false, updatedAt: false})
Orden.belongsTo(StatusOrden, {as: 'orden_statusOrden', foreignKey:'ordenStatusOrden', timestamps: false, createdAt: false, updatedAt: false})

//DetalleOrden
DetalleOrden.belongsTo(Orden, {as: 'detalleOrden', foreignKey:'idOrden', timestamps: false, createdAt: false, updatedAt: false})
DetalleOrden.belongsTo(UbicacionOrden, {as: 'detalleOrden_ubicacion', foreignKey:'ubicacion', timestamps: false, createdAt: false, updatedAt: false})

//StatusOrden
StatusOrden.hasMany(Orden, { as: 'orden_statusOrden', foreignKey: 'ordenStatusOrden', timestamps: false, createdAt: false, updatedAt: false})

//StatusPago
StatusPagos.hasMany(Orden, { as: 'orden_statusPago', foreignKey: 'ordenStatusPago', timestamps: false, createdAt: false, updatedAt: false})

//UbicacionOrden
UbicacionOrden.hasMany(Orden, { as: 'orden_ubicacion', foreignKey: 'ordenUbicacion', timestamps: false, createdAt: false, updatedAt: false})
UbicacionOrden.hasMany(DetalleOrden, { as: 'detalleOrden_ubicacion', foreignKey: 'ubicacion', timestamps: false, createdAt: false, updatedAt: false})

// Relación de modelos VideoGame y Platforms.
/* Videogame.belongsToMany(Platform, { through: 'VideoGamePlatform', timestamps: false, createdAt: false, updatedAt: false});
Platform.belongsToMany(Videogame, { through: 'VideoGamePlatform', timestamps: false, createdAt: false, updatedAt: false}); */

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
