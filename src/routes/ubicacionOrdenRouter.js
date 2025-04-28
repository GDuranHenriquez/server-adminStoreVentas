const { Router } = require('express');
const getAllUbicacionOrden = require('../controllers/ubicacionOrden/getAll.js');

const ubicacionOrdenRouter = Router();

ubicacionOrdenRouter.get('/', getAllUbicacionOrden);

module.exports = ubicacionOrdenRouter;