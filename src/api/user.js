const axios = require('axios')
const userApi = require('./config').userApi
var exports = module.exports = {}

exports.login = async (email,password) => {
  url = userApi('login')
  axios.post(url, {
    email: email,
    password: password
  }).then(
    (res) => {
      console.log(res)
    }
  )
}
