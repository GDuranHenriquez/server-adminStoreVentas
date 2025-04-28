const { Orden, DetalleOrden, Departamento, Cliente, Usuario, StatusPagos, StatusOrden } = require('../../db');

async function getAllOrdersByUser(req, res){
  try {
    const { id_usuario } = req.params;
    const orders = await Orden.findAll({where: {ordenUsuario: id_usuario}});
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Error al obtener las ordenes'});
  }
}

module.exports = getAllOrdersByUser;
