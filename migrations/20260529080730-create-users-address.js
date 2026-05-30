'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_users_addresses_trn', {
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
      address_type: {
        type: Sequelize.ENUM('CURRENT','PERMANENT'),
        defaultValue:'CURRENT'
      },
      country_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_countries_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      state_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_states_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      city_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references: {
          model: 'tbl_cities_mst',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull:true
      },
      address: {
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
    await queryInterface.dropTable('UsersAddresses');
  }
};