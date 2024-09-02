'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wolf extends Model {
    /**`
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wolf.init({
    name: DataTypes.STRING,
    git: DataTypes.STRING,
    bonus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wolf',
  });
  return Wolf;
};