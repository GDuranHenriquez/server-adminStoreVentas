const moment = require('moment-timezone');

const htmlReportProducts = (data, departamento) => {
  
  const getDateMoment = (date) => {
    const fechaModificada = moment.utc(date).tz('America/Caracas');
    const fechaFormateada = fechaModificada.format('YYYY-MM-DD hh:mm:ss');
    return fechaFormateada
  }
 
  const getHtmlReportProduct = (arrProduct) => {           
    
            
    let htmlString = '';
    const nrows = arrProduct.length;

    for(let i = 0; i < nrows; i ++){
      const product = arrProduct[i];
      const rowHtml = `
        <tr style="font-size: 10px;">
          <td style="border: 1px #000000 solid; padding: 3px; width: '113px';">${product.codigo}</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '113px';">${product.nombre}</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '226px';">${product.descripcion}</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '92px';">${product.lote ? product.lote: ''}</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '92px';">${(product.unidad_p_bulto).toFixed(2)}Bs.</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '92px';">${(product.total_bulto).toFixed(2)}Ref.</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '92px';">${(product.cantidad_unidad).toFixed(2)}</td>
          <td style="border: 1px #000000 solid; padding: 3px; width: '92px';">${(product.total_unidades).toFixed(2)}</td>
        </tr>
      `
      htmlString = htmlString + rowHtml;
    }
    return htmlString
  }

  return ` 
  <!DOCTYPE html>
  <html lang="es">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Browser</title>
  </head>

  <body>   
    <h5>Reporte de productos en stock correspondientes al departamento ${departamento}. </h5>  
    <p>Reporte correspondiente a ${departamento.toUpperCase()}</p>
    <div style="display: flex; justify-content: center; flex-direction: column ;min-width: 750px;">
      <table style="border: 1px #000000 solid; border-collapse: collapse; min-width: 733px; ">
        <thead>
          <tr style="background: #dcdcdc; font-size: 10px;">
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '110px';">codigo</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '220px';">nombre</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '226px';">descripcion</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '80px';">lote</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '90px';">unidad_p_bulto</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '90px';">total_bulto</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '90px';">cantidad_unidad</th>
            <th style="border: 1px #000000 solid; border-collapse: collapse; padding: 3px; width: '90px';">total_unidades</th>
          </tr>
        </thead>
        <tbody style="min-width: '820px'">
          ${getHtmlReportProduct(data)}
        </tbody>
      </table>            
    </div>
    <script src="script.js"></script>
  </body>
  
  </html>
  `
}

module.exports = htmlReportProducts