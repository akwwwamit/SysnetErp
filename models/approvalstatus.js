'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApprovalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      ApprovalStatus.hasMany(models.Company, {
    foreignKey: 'approval_status_id',
  });
  
      ApprovalStatus.hasOne(models.User, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.BloodGroup, {
        foreignKey: 'approval_status_id',
      });

      

      ApprovalStatus.hasOne(models.Department, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.Designation, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.EmployeeCategory, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.EmployementType, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.Grade, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.MarritalStatus, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.Saluation, {
        foreignKey: 'approval_status_id',
      });

      ApprovalStatus.hasOne(models.UserType, {
        foreignKey: 'approval_status_id',
      });
    }
  }
  ApprovalStatus.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:true
    },
    status: {
      type:DataTypes.CHAR(1),
      defaultValue:1,
      allowNull:false
    },
    approval_status_id: {
      type: DataTypes.BIGINT,
      allowNull:false,
      defaultValue: 1
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
    modelName: 'ApprovalStatus',
    tableName: 'tbl_approval_statuses_mst',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return ApprovalStatus;
};