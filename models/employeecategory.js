'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeCategory.belongsTo(models.Company, {
        foreignKey: 'company_id'
      });

      EmployeeCategory.belongsTo(models.ApprovalStatus, {
        foreignKey: 'approval_status_id' 
      });
    }
  }
  EmployeeCategory.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull:false
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
    modelName: 'EmployeeCategory',
    tableName:'tbl_employee_categories_mst',
    underscored:true,
    timestamps: true,
  });
  return EmployeeCategory;
};