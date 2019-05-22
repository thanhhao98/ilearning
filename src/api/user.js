const axios = require('axios')
import { userApi } from './config'
export default {
  login: async (email,password) => {
    let url = userApi('login')
    return await axios.post(url, {
      email: email,
      password: password
    })
  }
}
