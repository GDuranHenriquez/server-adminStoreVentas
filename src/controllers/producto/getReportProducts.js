const { Producto, Usuario, Departamento } = require('../../db');
const { Op } = require('sequelize');
const htmlReportProducts = require('../pdfCreate/htmlReportProducts');
const generatePdfCutClose = require('../../utils/generatePdfCutClose')

async function getReportProducts(req, res){
  try {
    const { departamento } = req.body;
    const user = req.user;
    
    if(typeof departamento !== 'number' && departamento <= 0){
      return res.status(200).json({error: 'Departamento para el reporte incorrecto'});
    }

    let depart = await Departamento.findByPk(departamento, {
      attributes: ['nombre']
    });
    depart = depart.dataValues;
       
    const productos = await Producto.findAll({
      where: {
        departamento: departamento,
        delete: false
      }
    });
    const lisData = []    
    productos.forEach(element => {
      lisData.push(element.dataValues)
    });
          
    const htmlAllData = htmlReportProducts(lisData, depart.nombre) 
    const bs64Pdf = await generatePdfCutClose(htmlAllData);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({pdf : bs64Pdf})      
     
  } catch (error) {
    return res.status(400).json({ error : error.message})
  }
}

module.exports = getReportProducts;