'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LogItem.init({
    RecordId: DataTypes.INTEGER,
    LogId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LogItem',
  });
  return LogItem;
};