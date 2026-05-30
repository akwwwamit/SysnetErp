'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.belongsTo(models.Country, {
        foreignKey: 'country_id'
      });

      State.hasMany(models.City, {
        foreignKey: 'state_id',
      });

      State.hasMany(models.UsersAddress, {
        foreignKey: 'state_id',
      });
    }
  }
  State.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    country_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'State',
    tableName:'tbl_states_mst',
    underscored:true,
    timestamps:false
  });
  return State;
};