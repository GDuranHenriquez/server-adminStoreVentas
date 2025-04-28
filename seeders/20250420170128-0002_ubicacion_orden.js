'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ubicacionOrden', [
      {
        nombre_referencia: 'tienda',
        nombre: 'Tienda',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nombre_referencia: 'shein',
        nombre: 'Shein',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nombre_referencia: 'temu',
        nombre: 'Temu',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nombre_referencia: 'amazon',
        nombre: 'Amazon',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nombre_referencia: 'aliexpress',
        nombre: 'Aliexpress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nombre_referencia: 'wish',
        nombre: 'Wish',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nombre_referencia: 'ebay',
        nombre: 'Ebay',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ubicacionOrden', null, {});
  }
};
