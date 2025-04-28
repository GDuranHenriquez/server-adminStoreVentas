const { Router } = require('express');
const postNewClient = require('../controllers/cliente/postNewClient.js');
const getAllClient = require('../controllers/cliente/getAllClient.js');
const getClientDni = require('../controllers/cliente/getClientDni.js')
const getClients = require('../controllers/cliente/getClien.js')
const clientRouter = Router();

clientRouter.post('/', postNewClient);
clientRouter.get('/dni/dni/:dni/idTipoDni/:idTipoDni', getClientDni);
clientRouter.get('/search/:text_search?', getClients);
clientRouter.get('/',  getAllClient);

module.exports = clientRouter;