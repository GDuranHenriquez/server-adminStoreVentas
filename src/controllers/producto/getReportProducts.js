const { Producto, Usuario, Departamento } = require('../../db');
const { Op } = require('sequelize');
const htmlReportProducts = require('../pdfCreate/htmlReportProducts');
const pdf = require('html-pdf');

async function getReportProducts(req, res){
  try {
    const { departamento } = req.body;
    const user = req.user;
    if(typeof departamento !== 'number' && departamento <= 0){
      return res.status(200).json({error: 'Departamento para el reporte incorrecto'});
    }

    const userRole = ["root", "admin"]

    if(!userRole.includes(user.level)){
      return res.status(200).json({error: 'No tiene autorización para imprimir reporte'});
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
    //const bs64Pdf = await generatePdfCutClose(htmlAllData);
    pdf.create(htmlAllData).toStream((err, stream) => {
      if (err) return res.status(500).send(err.message);
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; ${'reporteProductos_' + depart.nombre}.pdf`);
  
      return stream.pipe(res);
    });
    /* res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({pdf : bs64Pdf}) */      
     
  } catch (error) {
    return res.status(400).json({ error : error.message})
  }
}

module.exports = getReportProducts;