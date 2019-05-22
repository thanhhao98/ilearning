const axios = require('axios')
import { teacherApi } from './config'
export default {
  login: async (email,password) => {
    let url = teacherApi('login')
    return await axios.post(url, {
      email: email,
      password: password
    })
  }
}
