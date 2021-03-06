'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Category)
      Expense.belongsTo(models.User)
    }
  }
  Expense.init(
    {
      date: DataTypes.DATE,
      item: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      note: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Expense',
      paranoid: true
    }
  )
  return Expense
}
