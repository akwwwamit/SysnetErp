'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_permissions_mst', null, {});
    await queryInterface.bulkInsert('tbl_permissions_mst', [{
        'id':1,
        'name': 'Read',
        'description': 'Read',
        'sort_order': 1,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':2,
        'name': 'Write',
        'description': 'Write',
        'sort_order': 2,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':3,
        'name': 'Delete',
        'description': 'Delete',
        'sort_order': 3,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':4,
        'name': 'Disable',
        'description': 'Disable',
        'sort_order': 4,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':5,
        'name': 'Enable',
        'description': 'Enable',
        'sort_order': 5,
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_permissions_mst', null, {});
  }
};
