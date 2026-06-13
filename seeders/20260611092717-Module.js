'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_modules_mst', null, {});
    await queryInterface.bulkInsert('tbl_modules_mst', [{
        'id':1,
        'group_id': 2,
        'name': 'Company',
        'url': '',
        'description': 'Company',
        'sort_order': 1,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':2,
        'group_id': 2,
        'name': 'Users',
        'url': '',
        'description': '',
        'sort_order': 2,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_modules_mst', null, {});
  }
};
