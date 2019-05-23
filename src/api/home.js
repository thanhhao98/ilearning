import { homeApi } from './config'
const axios = require('axios')
export default {
  listCourses: async (email, password) => {
    let url = homeApi('courseList')
    let res = await axios.get(url)
    return res
  },
  quickLook: async (id) => {
    let url = homeApi('quickLook/') + id
    let res = await axios.get(url)
    return res
  }
}
