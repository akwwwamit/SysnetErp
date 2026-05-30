'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Country.hasMany(models.State, {
        foreignKey: 'country_id',
      });

      Country.hasMany(models.UsersAddress, {
        foreignKey: 'country_id',
      });
    }
  }
  Country.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    shortname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    phonecode: {
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Country',
    tableName:'tbl_countries_mst',
    underscored:true,
    timestamps:false
  });
  return Country;
};