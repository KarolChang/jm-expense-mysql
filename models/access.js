'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Access.init(
    {
      RoleId: DataTypes.INTEGER,
      PermissionId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Access',
      paranoid: true
    }
  )
  return Access
}
