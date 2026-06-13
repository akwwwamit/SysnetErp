'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_user_role_permissions_trn', null, {});
    await queryInterface.bulkInsert('tbl_user_role_permissions_trn', [{
        'id':1,
        'module_id': 1,
        'role_id': 1,
        'permission_id': 1,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':2,
        'module_id': 1,
        'role_id': 1,
        'permission_id': 2,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':3,
        'module_id': 1,
        'role_id': 1,
        'permission_id': 3,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':4,
        'module_id': 1,
        'role_id': 1,
        'permission_id': 4,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':5,
        'module_id': 1,
        'role_id': 1,
        'permission_id': 5,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':6,
        'module_id': 2,
        'role_id': 1,
        'permission_id': 1,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':7,
        'module_id': 2,
        'role_id': 1,
        'permission_id': 2,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':8,
        'module_id': 2,
        'role_id': 1,
        'permission_id': 3,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':9,
        'module_id': 2,
        'role_id': 1,
        'permission_id': 4,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':10,
        'module_id': 2,
        'role_id': 1,
        'permission_id': 5,
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_user_role_permissions_trn', null, {});
  }
};
