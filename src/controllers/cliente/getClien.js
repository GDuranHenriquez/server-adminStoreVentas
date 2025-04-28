const { Cliente } = require('../../db');
const { Op } = require('sequelize');

async function getClients(req, res){

    try {
      const { text_search } = req.params;   
  
      if (!text_search) {
        return res.status(400).json({error: 'Debe proveer un texto de busqueda'});
      }
  
      let whereClause = {};
  
      if (text_search) {
        whereClause = {
          [Op.or]: [
            { nombre: { [Op.iLike]: `%${text_search.toString().toLowerCase()}%` } },
            { dni: { [Op.iLike]: `%${text_search.toString().toLowerCase()}%` } }
          ]
        };
      }
  
      const clients = await Cliente.findAll({
        where: whereClause
      });
  
      return res.status(200).json(clients);
  
    } catch (error) {
      return res.status(400).json({error: error});
    }
  };

module.exports = getClients;