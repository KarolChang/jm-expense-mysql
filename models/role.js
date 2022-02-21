'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User)
      Role.belongsToMany(models.Permission, {
        through: models.Access,
        foreignKey: 'RoleId',
        as: 'Permissions'
      })
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      name_en: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Role',
      paranoid: true
    }
  )
  return Role
}
