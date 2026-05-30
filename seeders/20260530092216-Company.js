'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_company_mst', null, {});
    await queryInterface.bulkInsert('tbl_company_mst', [{
        'id':1,
        'name': 'Sysnet',
        'logo': 'default.png',
        'location': 'Lusaka',
        'description': 'Lusaka road',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_company_mst', null, {});
  }
};
