const db = require('../../../models')
const User = db.User

const bindingLineUserId = async (data) => {
  try {
    const { email, lineUserId } = data
    if (!lineUserId || !email) {
      throw new Error('[參數 email 或 lineUserId 未傳入]')
    }
    const user = await User.findOne({ where: { email, active: true } })
    if (!user) {
      throw new Error('[使用者不存在或沒有被啟用]')
    }
    await user.update(data)
  } catch (err) {
    throw new Error('[ERROR]', err)
  }
}

const unlinkedLineUserId = async (data) => {
  try {
    const { lineUserId } = data
    const user = await User.findOne({ where: { lineUserId, active: true } })
    if (!user) {
      throw new Error('[使用者不存在或沒有被啟用]')
    }
    await user.update({ lineUserId: null })
  } catch (err) {
    throw new Error('[ERROR]', err)
  }
}

module.exports = { bindingLineUserId, unlinkedLineUserId }
