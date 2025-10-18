'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('usuario', [{
      password: '$2b$05$GxRxZEH6UEl8ar/S0d3YjuHeiW.HbCcUc3vb9xuIjU.ROntXLwjA6',
      correo: 'gregorioduran123@gmail.com', 
      nombre: 'Gregorio Duran', 
      level: 'root', 
      direccion: 'Lomas de la trinidad', 
      telefono: '584141832627', 
      dni: '21377316', 
      usuarioTipoDni: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuario', null, {});
  }
};
