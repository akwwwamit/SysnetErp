'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_departments_mst', null, {});
    await queryInterface.bulkInsert('tbl_departments_mst', [{
        'id':1,
        'company_id': 1,
        'name': 'Admin',
        'description': 'Admin',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':2,
        'company_id': 1,
        'name': 'Production',
        'description': 'Production',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':3,
        'company_id': 1,
        'name': 'HR',
        'description': 'HR',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':4,
        'company_id': 1,
        'name': 'Store',
        'description': 'Store',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':5,
        'company_id': 1,
        'name': 'Finance',
        'description': 'Finance',
        'status': 1,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_departments_mst', null, {});
  }
};
