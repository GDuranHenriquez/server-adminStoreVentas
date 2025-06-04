require('dotenv').config();
const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const moment = require('moment-timezone');
const { TazaDolar } = require('../../db');

async function getBcvRates(req, res) {
    try {
        const url = 'https://www.bcv.org.ve/';
        const response = await axios.get(url, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        const $ = cheerio.load(response.data);
        const dolarElement = $('#dolar strong');
        //const euroElement = $('#euro strong');
        let dolarRate = parseFloat(dolarElement.text().trim().replace(',', '.'));
        //let euroRate = parseFloat(euroElement.text().trim().replace(',', '.'));

        dolarRate = Math.round(dolarRate * 10000) / 10000;
        //euroRate = Math.round(euroRate * 10000) / 10000;

        const dateElement = $('.date-display-single');
        let rateDate = new Date(dateElement.attr('content'));

        // Formatear la fecha al formato YYYY-MM-DD
        let formattedDate = rateDate.toISOString().split('T')[0];

        // Buscar la última tasa registrada en la base de datos
        const lastRate = await TazaDolar.findOne({
            order: [['rate_date', 'DESC']]
        });

        // Si no hay última tasa o la fecha devuelta es mayor que la fecha de la última tasa
        if (lastRate && moment(lastRate.fecha).isBefore(rateDate, 'day')) {
            // Si hay una última tasa, registra los días faltantes con la misma tasa
            if (lastRate) {
                const currentDate = moment();
                const daysDifference = currentDate.diff(moment(lastRate.rate_date), 'days');
                const dataDolar = {                   
                    fecha: moment(lastRate.rate_date).add(i, 'days').toDate(),
                    tasa: dolarRate,
                    created_at : new Date().toISOString()
                };
                for (let i = 1; i <= daysDifference; i++) {
                    await TazaDolar.create(dataDolar);
                }
            }
        }

        const dataDolar = {
            fecha: rateDate,            
            tasa: dolarRate,
            created_at : new Date().toISOString()
        };

        // Registra la nueva tasa de cambio
        const newBCVRate = await BCVRates.create(dataDolar);

        console.log('***** Tasa de cambio BCV actualizada *****');
        console.log(`Tasa de cambio del dólar (USD): ${newBCVRate} Bs`);
        console.log(`Fecha: ${formattedDate}`);

        return newBCVRate;
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

module.exports = getBcvRates;