'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Company, {
        foreignKey: 'company_id'
      });

      User.hasMany(models.UsersLegal, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.UsersFamily, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.UsersEducation, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.UsersExperience, {
        foreignKey: 'user_id',
      });

      User.hasMany(models.UsersCurricular, {
        foreignKey: 'user_id',
      });

      User.hasOne(models.UserType, {
        foreignKey: 'user_type_id',
      });
    }
  }
  User.init({
     id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    user_type_id :{
      type: DataTypes.BIGINT,
      allowNull:false
    },
    saluation_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    blood_group_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    designation_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    department_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    emp_category_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    employement_type_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    grade_id: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull:true
    },
    mobile: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    refrence_number: {
      type:DataTypes.STRING,
      allowNull:true
    },
    gender: {
      type:DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull:true,
      defaultValue:'Male'
    },
    dob: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    place_of_birth: {
      type:DataTypes.STRING,
      allowNull:true
    },
    marrital_status: {
      type:DataTypes.ENUM('Single', 'Married', 'Divorced'),
      allowNull:true,
      defaultValue:'Single'
    },
    wedding_date: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    doj: {
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    biomatric_id: {
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
    modelName: 'User',
    tableName:'tbl_users_mst',
    underscored:true,
    timestamps: true,
  });
  return User;
};