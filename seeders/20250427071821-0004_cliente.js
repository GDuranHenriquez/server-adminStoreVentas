'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('cliente', 
    [
      {        
        nombre : 'Cliente',
        correo : null,
        direccion : 'Local 01',
        telefono : '00000000000',
        dni : '000000',
        clienteTipoDni : '1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {    
     await queryInterface.bulkDelete('cliente', null, {});
  }
};