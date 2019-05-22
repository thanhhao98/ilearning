const baseApi = 'https://api-ilearning.herokuapp.com/api/v1/'
const baseMedia = 'https://api-ilearning.herokuapp.com'

module.exports = {

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
    if(url.slice(0,5) == 'https'){
      return url
    }
    return baseMedia + url
  }
}
