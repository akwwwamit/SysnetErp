'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_users_educations_trn', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_users_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course: {
        type: Sequelize.STRING,
        allowNull:true
      },
      college: {
        type: Sequelize.STRING,
        allowNull:true
      },
      result: {
        type: Sequelize.STRING,
        allowNull:true
      },
      passing_year: {
        type: Sequelize.STRING,
        allowNull:true
      },
      remarks: {
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
    await queryInterface.dropTable('tbl_users_educations_trn');
  }
};