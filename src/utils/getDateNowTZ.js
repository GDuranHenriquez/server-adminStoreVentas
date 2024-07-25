require('dotenv').config();
const axios = require('axios');
/* const { format, utcToZonedTime } = require('date-fns-tz'); */

const getDateNowTz = async () => {  
  /* 
  const localDate = new Date();
  const utcYear = localDate.getUTCFullYear();
  const utcMonth = String(localDate.getUTCMonth() + 1).padStart(2, '0');
  const utcDay = String(localDate.getUTCDate()).padStart(2, '0');
  const utcHour = String(localDate.getUTCHours()).padStart(2, '0');
  const utcMinute = String(localDate.getUTCMinutes()).padStart(2, '0');
  const utcSecond = String(localDate.getUTCSeconds()).padStart(2, '0');  
  const formattedDate = new Date(`${utcYear}-${utcMonth}-${utcDay}T${utcHour}:${utcMinute}:${utcSecond}`); */

    const { data } = await axios.get('https://worldtimeapi.org/api/timezone/America/Caracas');
    /* const data = await response.json(); */
    const currentDate = new Date(data.utc_datetime);
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
  
  return fecha;
  


  
}

module.exports = getDateNowTz;

