'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_users_mst', null, {});
    await queryInterface.bulkInsert('tbl_users_mst', [{
        'id':1,
        'user_code': 'U000000001',
        'company_id':1,
        'user_type_id':1,
        'saluation_id':1,
        'blood_group_id':1,
        'designation_id':1,
        'department_id':1,
        'emp_category_id':1,
        'employement_type_id':1,
        'grade_id':1,
        'first_name': 'Amit',
        'last_name': 'Yadav',
        'mobile': '9015843127',
        'email': 'akwwwamit@gmail.com',
        'password': '$2b$10$2QtvffdxfKqCRvr1EeGwKe7yg.I0Kx4qjXDGvRMkjPXAnxyf8lFJW',
        'refrence_number': 'akwwwamit@gmail.com',
        'gender': 'Male',
        'dob': '1992-01-01',
        'place_of_birth': 'Kushinagar',
        'marrital_status': 'Married',
        'wedding_date': '2022-01-01',
        'doj': '2022-01-01',
        'approval_status_id': 1,
        'status': 1,
        'created_at':new Date(),
        'created_by':1
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_users_mst', null, {});
  }
};
