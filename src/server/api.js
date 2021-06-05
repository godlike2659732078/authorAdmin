//api 请求配置文件
const POST_LOGIN = "/sys/login";
const POST_GOOUT = "/sys/loginout";
//const POST_UPLOAD = "https://3.10.119.116:8900/file/upload";          // 图片上传

if (process.env.NODE_ENV === "development") {
  var IMAGE_URL = "http://192.168.1.29:8092/";
  // var POST_UPLOAD = "https://192.168.10.183:8900/file/upload";          // 图片上传
  var POST_UPLOAD = "https://admin.starchain.cool/file/upload"; // 图片上传
  //var IMAGE_URL = "https://api.starchain.cool/";
} else {
  var IMAGE_URL = "https://api.starchain.cool/";
  var POST_UPLOAD = "https://admin.starchain.cool/file/upload"; // 图片上传
}

const POSTLOGIN = "/api/member/user/login"; // 用户登录
const GETUSERINFO = "/api/member/user/info"; //获取用户详情
const GETBOOKLIST = "/api/member/author/book" //书籍列表
const POSTBOOKADD = "/api/member/author/book/add" //书籍添加
const GETBOOKCONTENT = "/api/member/author/content" //书籍章节
const POSTBOOKCONTENTADD = "/api/member/author/content/add" //书籍添加更新
const POSTGETONEBOOKCONTENT = "/api/member/author/content/info" //获取单个书籍章节信息
const GETCLASSTROEE = "/basic/book/type/tree" //获取分类树形结构
const GETUPLOADTOKEN = "/basic/qiniu/getToken" //获取七牛云token
const GETBOOKTAG = "/basic/book/tag/all" //获取七牛云tag

export default {
  POSTLOGIN,
  GETUSERINFO,
  IMAGE_URL,
  POST_UPLOAD,
  GETBOOKLIST, //书籍列表
  POSTBOOKADD, //书籍添加
  GETBOOKCONTENT, //书籍章节
  POSTBOOKCONTENTADD, //书籍添加更新
  POSTGETONEBOOKCONTENT, //获取单个书籍章节信息
  GETCLASSTROEE,
  GETUPLOADTOKEN,
  GETBOOKTAG
};