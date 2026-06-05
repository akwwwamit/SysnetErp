'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Saluation, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.BloodGroup, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.Designation, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.Department, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.EmployeeCategory, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.EmployementType, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.Grade, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.User, {
        foreignKey: 'company_id',
      });

      Company.hasMany(models.ApprovalStatus, {
        foreignKey: 'company_id',
      });
    }
  }
  Company.init({
     id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    logo: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'default.png'
    },
    location: {
      type:DataTypes.TEXT,
      allowNull:true
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
    modelName: 'Company',
    tableName:'tbl_company_mst',
    underscored:true,
    timestamps: true,
  });
  return Company;
};