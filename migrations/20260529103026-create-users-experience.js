'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_users_experiences_trn', {
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
      company: {
        type: Sequelize.STRING,
        allowNull:true
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull:true
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      designation: {
        type: Sequelize.STRING,
        allowNull:true
      },
      ctc: {
        type: Sequelize.STRING,
        allowNull:true
      },
      reason_for_leaving: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('tbl_users_experiences_trn');
  }
};