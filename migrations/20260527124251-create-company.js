'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_company_mst', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING,
        defaultValue:'default.png'
      },
      location: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      description: {
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
    await queryInterface.dropTable('tbl_company_mst');
  }
};