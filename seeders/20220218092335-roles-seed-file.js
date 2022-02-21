'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: '最高管理者',
          name_en: 'root',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '管理者',
          name_en: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '一般成員',
          name_en: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
