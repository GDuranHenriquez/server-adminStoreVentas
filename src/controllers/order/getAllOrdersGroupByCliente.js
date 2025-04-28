const { Orden, Cliente, StatusOrden } = require('../../db');

async function getAllOrdersGroupByCliente(req, res){
  try {
    const { id_usuario } = req.params;
    const orders = await Orden.findAll({
        where: { ordenUsuario: id_usuario },
        include: [{ model: Cliente, as: 'orden_cliente' }, { model: StatusOrden, as: 'orden_statusOrden' }],
        order: [['created_at', 'DESC']] 
    });

    const grouped = {};
    for (const order of orders) {
      const cliente = order.orden_cliente;
      if (!cliente) continue;

      const clienteId = cliente.id;

      if (!grouped[clienteId]) {
        grouped[clienteId] = {
          cliente: cliente.toJSON(),
          ordenes: [],
        };
      }
      const orderData = order.toJSON();
      delete orderData.orden_cliente
      grouped[clienteId].ordenes.push(orderData);
    }
    const result = Object.values(grouped);
    return res.status(200).json(result);

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Error al obtener las ordenes'});
  }
}

module.exports = getAllOrdersGroupByCliente;
