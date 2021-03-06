'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Expense)
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Category',
      paranoid: true,
    }
  )
  return Category
}
