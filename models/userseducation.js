'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersEducation.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  UsersEducation.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    course: {
      type:DataTypes.STRING,
      allowNull:true
    },
    college: {
      type:DataTypes.STRING,
      allowNull:true
    },
    result: {
      type:DataTypes.STRING,
      allowNull:true
    },
    passing_year: {
      type:DataTypes.STRING,
      allowNull:true
    },
    remarks: {
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
    modelName: 'UsersEducation',
    tableName:'tbl_users_educations_trn',
    underscored:true,
    timestamps: true,
  });
  return UsersEducation;
};