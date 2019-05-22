var exports = module.exports = {}

exports.baseApi = 'https://api-ilearning.herokuapp.com/api/v1/'
exports.baseMedia = 'https://api-ilearning.herokuapp.com'
exports.userApi = (url) => {
  return exports.baseApi + 'user/' + url
}
exports.teacherApi = (url) => {
  return exports.baseApi + 'admin/' + url
}
exports.homeApi = (url) => {
  return exports.baseApi + url
}
