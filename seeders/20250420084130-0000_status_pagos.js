'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statusOrden', [
      {
        name_reference: 'tomada',
        nombre: 'Tomada',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'pendiente_pedido',
        nombre: 'Pendiente de pedido',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'pedido_realizado',
        nombre: 'Pedido realizado',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'en_transito_origen',
        nombre: 'En transito origen',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'recibido_local_origen',
        nombre: 'Recibido local origen',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'en_transito_destino',
        nombre: 'En transito destino',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'recibido_local_destino',
        nombre: 'Recibido local destino',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        name_reference: 'entregado',
        nombre: 'Entregado',
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
    await queryInterface.bulkDelete('statusOrden', null, {});
  }
};
