'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Record)
      User.hasMany(models.Log)
      User.hasMany(models.Expense)
      User.belongsTo(models.Role)
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      displayName: DataTypes.STRING,
      photoURL: DataTypes.STRING,
      firebaseUid: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      lineUserId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
