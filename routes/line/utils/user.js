const db = require('../../../models')
const User = db.User

const bindingLineUserId = async (data) => {
  try {
    console.log('bindingLineUserId')
    const { email, lineUserId } = data
    if (!lineUserId) {
      return res.json({ status: 'error', message: '[參數未傳入] lineUserId' })
    }
    const user = await User.findOne({ where: { email, active: true } })
    if (!user) {
      return res.json({ status: 'error', message: 'user is not existed or not active' })
    }
    const updatedUser = await user.update(data)
    return res.json({ status: 'success', data: updatedUser })
  } catch (err) {
    console.log('[ERROR]', err)
  }
}

module.exports = { bindingLineUserId }
