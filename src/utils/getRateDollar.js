const axios = require('axios');
const cheerio = require('cheerio');
const { TazaDolar } = require('../db');
const https = require('https');
require('dotenv').config();

const { CONFIG_RATE } = process.env

async function getRateDollar(req, res){
  try {

    //const { data } = await axios.get('https://worldtimeapi.org/api/timezone/America/Caracas');
    /* const data = await response.json(); */
    let currentDate = new Date();
    const offsetCaracas = -4 * 60 * 60 * 1000; // -4 horas en milisegundos
    currentDate = new Date(currentDate.getTime() + offsetCaracas);
    //obtener la hora
    const hora = String(currentDate.getHours()).padStart(2, '0');
    const minutos = String(currentDate.getMinutes()).padStart(2, '0');
    const segundos = String(currentDate.getSeconds()).padStart(2, '0');
    //obtener la fecha
    const dia = String(currentDate.getDate()).padStart(2, '0');
    const mes = String(currentDate.getMonth() + 1).padStart(2, '0');
    const anio = String(currentDate.getFullYear());
    //data
    const fecha = new Date(`${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}`);
    
    if(CONFIG_RATE && CONFIG_RATE === 'MANUAL'){
      const dataMoreRecent = await TazaDolar.findOne({order: [['fecha', 'DESC']]});
      if(!dataMoreRecent){ 
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({"id":0,"tasa":0,"fecha":fecha});     
      }

      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(dataMoreRecent);

    }else{

      const url = 'https://www.bcv.org.ve/';
      const response = await axios.get(url, {
          httpsAgent: new https.Agent({
              rejectUnauthorized: false
          })
      });

      const $ = cheerio.load(response.data);
      const dollarElement = $('#dolar strong');      
      let dolarRate = parseFloat(dollarElement.text().trim().replace(',', '.'));
      //const dateElement = $('.date-display-single');
      //let rateDate = new Date(dateElement.attr('content'));
      let formattedDate = new Date().toISOString();
      dolarRate = Math.round(dolarRate * 10000) / 10000;

      const dataTasaDollar = {tasa: dolarRate, fecha: formattedDate}
      
      const dataMoreRecent = await TazaDolar.findOne({order: [['fecha', 'DESC']]});

      if(!dataMoreRecent){
        const newTasaDolar = await TazaDolar.create(dataTasaDollar); 
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(newTasaDolar);     
      }else{
        const fechaDataRate = new Date(dataMoreRecent.dataValues.fecha);
        const anio1 = fechaDataRate.getFullYear();
        const mes1 = fechaDataRate.getMonth();
        const dia1 = fechaDataRate.getDate();

        // Extraer año, mes y día de la segunda fecha
        const anio2 = fecha.getFullYear();
        const mes2 = fecha.getMonth();
        const dia2 = fecha.getDate();

        if (anio1 === anio2 && mes1 === mes2 && dia1 === dia2) {
          const horaReferencia = new Date(fechaDataRate);
          horaReferencia.setHours(12, 0, 0, 0);
          if (fechaDataRate.getHours() < horaReferencia.getHours() && fecha.getHours() < horaReferencia.getHours()) {
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).json(dataMoreRecent);
          } else if (fechaDataRate.getHours() > horaReferencia.getHours() && fecha.getHours() > horaReferencia.getHours()) {
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).json(dataMoreRecent);
          }else if (fechaDataRate.getHours() < horaReferencia.getHours() && fecha.getHours() > horaReferencia.getHours()) {
            const newTasaDolar = await TazaDolar.create(dataTasaDollar);
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).json(newTasaDolar);
          } 
        } else if (anio1 > anio2 || (anio1 === anio2 && mes1 > mes2) || (anio1 === anio2 && mes1 === mes2 && dia1 > dia2)) {
          return res.status(400).json({error: 'La fecha de la petición es inferior a ultima fecha registrada'});
        } else {
          const newTasaDolar = await TazaDolar.create(dataTasaDollar);
          // {"id":4,"tasa":36.53,"fecha":"2024-07-23T15:55:36.000Z"}
          res.setHeader('Cache-Control', 'no-store');
          return res.status(200).json(newTasaDolar);
        }
      }
      res.setHeader('Cache-Control', 'no-store');  
      return res.status(200).json(dataMoreRecent);
    }

  } catch (error) {
    return res.status(400).json({error: error});
  }
}

module.exports = getRateDollar;