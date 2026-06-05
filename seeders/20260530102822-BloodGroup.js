'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_blood_groups_mst', null, {});
    await queryInterface.bulkInsert('tbl_blood_groups_mst', [{
        'id':1,
        'company_id': 1,
        'name': 'A+',
        'description': 'A+',
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':2,
        'company_id': 1,
        'name': 'A-',
        'description': 'A-',
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':3,
        'company_id': 1,
        'name': 'B+',
        'description': 'B+',
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':4,
        'company_id': 1,
        'name': 'B-',
        'description': 'B-',
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      },{
        'id':5,
        'company_id': 1,
        'name': 'N/A',
        'description': 'N/A',
        'status': 1,
        'approval_status_id':2,
        'created_at':new Date(),
        'created_by':1,
        'updated_at':new Date(),
        'updated_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_blood_groups_mst', null, {});
  }
};
