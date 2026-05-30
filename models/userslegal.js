'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersLegal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersLegal.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  UsersLegal.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    dl_no: {
      type:DataTypes.STRING,
      allowNull:false
    },
    dl_expiery_date: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    passport_no: {
      type:DataTypes.STRING,
      allowNull:false
    },
    passport_expiery_date: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    work_permit_no: {
      type:DataTypes.STRING,
      allowNull:false
    },
    work_permit_expiery_date: {
      type:DataTypes.DATEONLY,
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
      allowNull:true
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
    modelName: 'UsersLegal',
    tableName:'tbl_users_legals_trn',
    underscored:true,
    timestamps: true,
  });
  return UsersLegal;
};