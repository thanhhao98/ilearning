const baseApi = 'https://api-ilearning.herokuapp.com/api/v1/'
const baseMedia = 'https://api-ilearning.herokuapp.com'

module.exports = {
  rules: {
    required: v => !!v || 'Required.',
    min: v => v.length >= 6 || 'Min 6 characters',
    emailRules: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  },
  userApi : (url) => {
    return baseApi + 'user/' + url
  },
  teacherApi : (url) => {
    return baseApi + 'admin/' + url
  },
  homeApi: (url) => {
    return baseApi + url
  },
  media: (url)=>{
    if(url.slice(0,5) == 'https') {
      return url
    } else if (url=='') {
      return
    }
    return baseMedia + url
  }
}
