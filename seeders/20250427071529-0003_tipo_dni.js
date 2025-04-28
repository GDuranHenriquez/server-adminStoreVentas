'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipoDni', 
    [{
        tipo: 'V',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        tipo: 'E',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        tipo: 'J',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        tipo: 'P',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        tipo: 'G',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }  
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipoDni', null, {});
  }
};
