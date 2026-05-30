'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_users_mst', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_company_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_type_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_user_types_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      saluation_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_saluations_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      blood_group_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_blood_groups_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      designation_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_designations_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      department_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_departments_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      emp_category_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_employee_categories_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      employement_type_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_employement_types_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      grade_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_grades_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      refrence_number: {
        type: Sequelize.STRING,
        allowNull:true
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull:true,
        defaultValue:'Male'
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      place_of_birth: {
        type: Sequelize.STRING,
        allowNull:true
      },
      marrital_status: {
        type: Sequelize.ENUM('Single', 'Married', 'Divorced'),
        allowNull:true,
        defaultValue:'Single'
      },
      wedding_date: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      doj: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      biomatric_id: {
        type: Sequelize.STRING,
        allowNull:true
      },
      status: {
        type: Sequelize.CHAR(1),
        defaultValue:1,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
      created_by: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue:1
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_users_mst');
  }
};