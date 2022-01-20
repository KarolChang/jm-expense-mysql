const admin = require('firebase-admin')
const serviceAccount = require('./jm-expense-2022-firebase-adminsdk-f6v3h-fce130054a.json')

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = adminApp
