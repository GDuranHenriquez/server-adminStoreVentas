const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { authenticate } = require('./auth/athenticate');

//Require All Routes.
const productRouter = require('./routes/productosRouter.js')
const categoriasRouter = require('./routes/categoriasRouter.js');
const presentacionRouter = require('./routes/presentacionRouter.js');
const clientRouter = require('./routes/clientRouter.js');
const usuarioRouter = require('./routes/usuarioRouter.js');
const dniTipoRouter = require('./routes/dniTipoRouter.js');
const ventasRouter = require('./routes/ventasRouter.js');
const routerLoginRegister = require('./routes/routerLoginRegister.js');
const tokenRouter = require('./routes/routerToken.js');
const routerDataUser = require('./routes/routerProtecteDateUser');
const routerDepartamento = require('./routes/routerDepartamento.js');
const orderRouter = require('./routes/orderRouters.js');
const ubicacionOrdenRouter = require('./routes/ubicacionOrdenRouter.js');

require('./db.js');

const server = express();
server.use(cors({
  origin: '*',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
}));

server.name = 'Magnament Inventari';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//server.use('/', routes);
server.use('/api/data-user', authenticate, routerDataUser);

server.use('/api/categorias', categoriasRouter);
server.use('/api/productos', authenticate ,productRouter);
server.use('/api/presentacion', authenticate, presentacionRouter);
server.use('/api/departamento', routerDepartamento);
server.use('/api/tipoDni', dniTipoRouter);
server.use('/api/cliente', clientRouter);
server.use('/api/ubicacionOrden', ubicacionOrdenRouter);
server.use('/api/venta', authenticate, ventasRouter);
server.use('/api/usuario', usuarioRouter);
server.use('/api/sign-in-out', routerLoginRegister);
server.use('/api/token', tokenRouter);
server.use('/api/orden', orderRouter);
server.use('/api/upload', express.static(path.join(__dirname, 'upload')));


server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
