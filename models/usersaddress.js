'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersAddress.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      UsersAddress.belongsTo(models.Country, {
        foreignKey: 'country_id'
      });

      UsersAddress.belongsTo(models.State, {
        foreignKey: 'state_id'
      });

      UsersAddress.belongsTo(models.City, {
        foreignKey: 'city_id'
      });
    }
  }
  UsersAddress.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    address_type: {
      type: DataTypes.ENUM('CURRENT','PERMANENT'),
      defaultValue:'CURRENT'
    },
    country_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    state_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    city_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    pincode:{
      type: DataTypes.STRING,
      allowNull:true
    },
    address:{
      type: DataTypes.TEXT,
      allowNull:true
    },
    status: {
      type:DataTypes.CHAR(1),
      defaultValue:1,
      allowNull:false
    },
    created_at: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:DataTypes.NOW,
      get() {
        return this.getDataValue("created_at")
        ? new Date(this.getDataValue("created_at")).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        : null;
      }
    },
    created_by: {
      type:DataTypes.BIGINT,
      allowNull:true
    },
    updated_at: {
      type:DataTypes.DATE,
      allowNull:true,
      get() {
        return this.getDataValue("updated_at")
        ? new Date(this.getDataValue("updated_at")).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        : null;
      }
    },
    updated_by: {
      type:DataTypes.BIGINT,
      allowNull:true
    },
    deleted_at: {
      type:DataTypes.DATE,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'UsersAddress',
    tableName:'tbl_users_addresses_trn',
    underscored:true,
    timestamps: true,
    paranoid: true
  });
  return UsersAddress;
};