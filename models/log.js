'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log.belongsTo(models.Record)
      Log.belongsTo(models.User)
      Log.belongsToMany(models.Record, {
        through: models.LogItem,
        foreignKey: 'LogId',
        as: 'Records'
      })
    }
  }
  Log.init(
    {
      action: {
        type: DataTypes.ENUM,
        values: ['新增', '編輯', '結算']
      },
      item: DataTypes.STRING,
      merchant: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      date: DataTypes.DATE,
      itemBefore: DataTypes.STRING,
      merchantBefore: DataTypes.STRING,
      amountBefore: DataTypes.INTEGER,
      dateBefore: DataTypes.DATE,
      closeAmount: DataTypes.INTEGER,
      RecordId: DataTypes.INTEGER,
      RecordIds: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Log',
    }
  )
  return Log
}
