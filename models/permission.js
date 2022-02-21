'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: models.Access,
        foreignKey: 'PermissionId',
        as: 'Roles'
      })
    }
  }
  Permission.init(
    {
      action: {
        type: DataTypes.ENUM,
        values: ['查看', '新增', '編輯', '刪除', '停用', '操作']
      },
      item: DataTypes.STRING,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Permission',
      paranoid: true
    }
  )
  return Permission
}
