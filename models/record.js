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
    }
  }
  Record.init(
    {
      date: DataTypes.DATE,
      item: DataTypes.STRING,
      merchant: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      recorder: {
        type: DataTypes.ENUM,
        values: ['建喵', '豬涵']
      },
      isClosed: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Record'
    }
  )
  return Record
}
