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
        <tr style="font-size: 8px;">
          <td>${product.codigo}</td>
          <td>${product.nombre}</td>
          <td>${product.descripcion}</td>
          <td>${product.lote ? product.lote: ''}</td>
          <td>${(product.unidad_p_bulto).toFixed(2)}</td>
          <td>${(product.total_bulto).toFixed(2)}</td>
          <td>${(product.cantidad_unidad).toFixed(2)}</td>
          <td>${(product.total_unidades).toFixed(2)}</td>
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
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
      h5 {
        text-align: center;
      }
      .container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 20px;
      }
      table {
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-collapse: collapse;
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
      }
      th, td {
        border: 1px solid rgba(0, 0, 0, 0.25);
        padding: 8px;
        text-align: center;
      }
      thead {
        background-color: #dcdcdc;
      }
      @media print {
        table {
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        thead {
          display: table-header-group;
        }
        tfoot {
          display: table-footer-group;
        }
      }
    </style>
    <title>Reporte de productos</title>
  </head>

  <body>   
    <h5>Reporte de productos en stock correspondientes al departamento ${departamento}. </h5>  
    <p>Reporte correspondiente a ${departamento.toUpperCase()}</p>
    <div style="display: flex; justify-content: center; flex-direction: column ;min-width: 750px;">
      <table style="border: 1px rgba(0, 0, 0, 0.5) solid; border-collapse: collapse; min-width: 733px; display: 'flex'; justify-content: 'center'; aling-item: 'center'; ">
        <thead>
          <tr style="background: #dcdcdc; font-size: 8px;">
            <th>codigo</th>
            <th>nombre</th>
            <th>descripcion</th>
            <th>lote</th>
            <th>Un./Bulto</th>
            <th>T. Bulto</th>
            <th>Uni. Sueltas</th>
            <th>T. Unid</th>
          </tr>
        </thead>
        <tbody style="min-width: '780px'">
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