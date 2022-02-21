'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          action: '查看',
          item: '使用者',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '使用者',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '停用',
          item: '使用者',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '使用者(自己)',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '查看',
          item: '角色',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '新增',
          item: '角色',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '角色',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '刪除',
          item: '角色',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '查看',
          item: '權限',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '新增',
          item: '權限',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '權限',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '刪除',
          item: '權限',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '操作',
          item: '角色權限配置',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '查看',
          item: '紀錄',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '新增',
          item: '紀錄',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '紀錄',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '刪除',
          item: '紀錄',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '查看',
          item: '歷程',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '查看',
          item: '記帳',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '新增',
          item: '記帳',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '記帳',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '刪除',
          item: '記帳',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '查看',
          item: '記帳類別',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '新增',
          item: '記帳類別',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '編輯',
          item: '記帳類別',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '刪除',
          item: '記帳類別',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '操作',
          item: '小工具',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: '操作',
          item: '小遊戲',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
