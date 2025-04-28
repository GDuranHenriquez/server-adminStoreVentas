'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statusPagos', [
      {
        name_reference: 'pendiente',
        nombre: 'Pendiente',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'parcial',
        nombre: 'Parcial',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'completo',
        nombre: 'Completo',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'cancelado',
        nombre: 'Cancelado',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'rechazado',
        nombre: 'Rechazado',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statusPagos', null, {});
  }
};
