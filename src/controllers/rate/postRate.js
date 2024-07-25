require('dotenv').config();
const { TazaDolar } = require('../../db');
const getDateNowTz = require('../../utils/getDateNowTZ')

const { TIME_ZONE } = process.env;

async function postRate( req, res ){
  try {
    const { rate } = req.body;
    
    if(!TIME_ZONE){
      return res.status(404).json({error: 'Zona horaría no definida'});
    }

    if(!rate || typeof rate !== 'number'){
      return res.status(404).json({error: 'Falta enviar datos obligatorios o los datos son erroneos'});
    }

    const fecha = await getDateNowTz()
    
    const dataTasaDollar = {tasa: rate, fecha: fecha}

    const newTasaDolar = await TazaDolar.create(dataTasaDollar); 
    
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).json({...newTasaDolar.dataValues})

  } catch (error) {
    return res.status(400).json({error: error});
  }
}

module.exports = postRate;