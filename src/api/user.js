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
  listApprove: async (token) => {
    let url = userApi('getListCourseApprove')
    let res = await axios.get(url,{
      headers:
        {
          'Authorization':
          'thanhhao ' + token
        }
    })
    return res
  },
  listWaiting: async (token) => {
    let url = userApi('getListCourseWaiting')
    let res = await axios.get(url,{
      headers:
        {
          'Authorization':
          'thanhhao ' + token
        }
    })
    return res
  },
  learnCourse: async (courseId,token) =>{
    let url = userApi('viewCourse/') + courseId
    let res = await axios.get(url, {
      headers:
        {
          'Authorization':
          'thanhhao ' + token
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
