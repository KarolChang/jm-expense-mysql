'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.User)
      // 可能不會用到
      // Record.belongsToMany(models.Log, {
      //   through: models.LogItem,
      //   foreignKey: 'RecordId',
      //   as: 'Logs'
      // })
    }
  }
  Record.init(
    {
      date: DataTypes.DATE,
      item: DataTypes.STRING,
      merchant: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      isClosed: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE,
      UserId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Record',
      paranoid: true
    }
  )
  return Record
}
