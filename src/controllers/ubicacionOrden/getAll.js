const { UbicacionOrden } = require('../../db');

async function getAllUbicacionOrden(req, res){

  try {
    const allUbicacionOrden = await UbicacionOrden.findAll();
    return res.status(200).json(allUbicacionOrden);
  } catch (error) {
    return res.status(400).json({error: error});
  }
};

module.exports = getAllUbicacionOrden;