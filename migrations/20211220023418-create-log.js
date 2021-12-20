'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recorder: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['建喵', '豬涵']
      },
      action: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['新增', '編輯', '結算']
      },
      item: {
        type: Sequelize.STRING
      },
      merchant: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      itemBefore: {
        type: Sequelize.STRING
      },
      merchantBefore: {
        type: Sequelize.STRING
      },
      amountBefore: {
        type: Sequelize.INTEGER
      },
      dateBefore: {
        type: Sequelize.DATE
      },
      closeAmount: {
        type: Sequelize.INTEGER
      },
      RecordId: {
        type: Sequelize.INTEGER
      },
      RecordIds: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Logs')
  }
}
