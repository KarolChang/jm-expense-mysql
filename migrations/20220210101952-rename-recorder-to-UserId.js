'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Record model
    await queryInterface.removeColumn('Records', 'recorder')
    await queryInterface.addColumn('Records', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    // Logs model
    await queryInterface.removeColumn('Logs', 'recorder')
    await queryInterface.addColumn('Logs', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },
  down: async (queryInterface, Sequelize) => {
    // Record model
    await queryInterface.addColumn('Records', 'recorder', {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['建喵', '豬涵']
    })
    await queryInterface.removeColumn('Records', 'UserId')
    // Logs model
    await queryInterface.addColumn('Logs', 'recorder', {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['建喵', '豬涵']
    })
    await queryInterface.removeColumn('Logs', 'UserId')
  }
};
