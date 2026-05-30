'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_employement_types_mst', null, {});
    await queryInterface.bulkInsert('tbl_employement_types_mst', [{
        'id':1,
        'company_id': 1,
        'name': 'PERMANENT',
        'description': 'PERMANENT',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':2,
        'company_id': 1,
        'name': 'CONTRACTUAL',
        'description': 'CONTRACTUAL',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_employement_types_mst', null, {});
  }
};
