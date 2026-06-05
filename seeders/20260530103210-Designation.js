'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_designations_mst', null, {});
    await queryInterface.bulkInsert('tbl_designations_mst', [{
        'id':1,
        'company_id': 1,
        'name': 'Admin',
        'description': 'Admin',
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_designations_mst', null, {});
  }
};
