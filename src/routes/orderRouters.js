const { Router } = require('express');
const postOrder = require('../controllers/order/postOrder.js');
const getAllOrdersByUser = require('../controllers/order/getAllOrders.js');
const getAllOrdersGroupByCliente = require('../controllers/order/getAllOrdersGroupByCliente.js');
const getDetailOrden = require('../controllers/order/getDetailOrden.js');

const orderRouter = Router();

orderRouter.post('/', postOrder);
orderRouter.get('/detail-orden/:id_orden', getDetailOrden);
orderRouter.get('/:id_usuario', getAllOrdersByUser);
orderRouter.get('/:id_usuario/cliente', getAllOrdersGroupByCliente);
module.exports = orderRouter;