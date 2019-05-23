const axios = require('axios')
import { userApi } from './config'
export default {
  login: async (email,password) => {
    let url = userApi('login')
    let res = await axios.post(url, {
      email: email,
      password: password
    })
    return res
  },
  register: async (formData) => {
    let url = userApi('signup')
    let res = await axios.post(url, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
  },
  signCourse: async (courseId,token) => {
    let url = userApi('signCourse')
    let res = await axios.post(url, {
      courseId: courseId
    }, {
      headers:
        {
          'Authorization':
          'thanhhao ' + token
        }
    })
    return res
  }

}
