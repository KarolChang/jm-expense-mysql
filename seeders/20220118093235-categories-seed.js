'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: '飲食費',
          icon: 'fas fa-utensils',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '交通費',
          icon: 'fas fa-bus-alt',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '娛樂費',
          icon: 'far fa-laugh-squint',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '家用費',
          icon: 'fas fa-house-user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '日用品',
          icon: 'fas fa-shopping-bag',
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
