'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.State, {
        foreignKey: 'state_id'
      });

      City.hasMany(models.UsersAddress, {
        foreignKey: 'city_id',
      });

    }
  }
  City.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'City',
    tableName:'tbl_cities_mst',
    underscored:true,
    timestamps:false
  });
  return City;
};