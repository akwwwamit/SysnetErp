'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_module_groups_mst', null, {});
    await queryInterface.bulkInsert('tbl_module_groups_mst', [{
        'id':1,
        'company_id': 1,
        'sub_group_id':0,
        'name': 'HR & Payroll',
        'description': 'Master',
        'sort_order': 1,
        'status': 1,
        'created_at':new Date(),
        'created_by':1
      },{
        'id':2,
        'company_id': 1,
        'sub_group_id':1,
        'name': 'Master',
        'description': 'Master',
        'sort_order': 1,
        'status': 1,
        'created_at':new Date(),
        'created_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_module_groups_mst', null, {});
  }
};
