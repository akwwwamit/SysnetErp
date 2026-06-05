'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersExperience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersExperience.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  UsersExperience.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    company: {
      type:DataTypes.STRING,
      allowNull:true
    },
    job_title: {
      type:DataTypes.STRING,
      allowNull:true
    },
    start_date: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    end_date: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    designation: {
      type:DataTypes.STRING,
      allowNull:true
    },
    ctc: {
      type:DataTypes.STRING,
      allowNull:true
    },
    reason_for_leaving: {
      type:DataTypes.STRING,
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
    modelName: 'UsersExperience',
    tableName:'tbl_users_experiences_trn',
    underscored:true,
    timestamps: true,
  });
  return UsersExperience;
};