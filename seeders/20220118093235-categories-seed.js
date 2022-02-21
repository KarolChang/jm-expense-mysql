'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: '飲食費',
          icon: 'fas fa-utensils',
          type: '支出',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '交通費',
          icon: 'fas fa-bus-alt',
          type: '支出',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '娛樂費',
          icon: 'far fa-laugh-squint',
          type: '支出',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '家用費',
          icon: 'fas fa-house-user',
          type: '支出',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '日用品',
          icon: 'fas fa-shopping-bag',
          type: '支出',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
