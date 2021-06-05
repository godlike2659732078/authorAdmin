
//请求
import api from './api'
import http from "./server"

function userLogin(params){
  let url = api.POSTLOGIN
  let data = params
  return http.post(url,data,res=>{
    return res.data;
  },false);
}

function getNavList(params) {
  let url = api.GET_NAVLIST;
  let data = params;
  return http.get(url,data,res=>{
    return res.data;
  },false);
}

function postNavAdd(params) {
  let url = api.POST_NAVADD;
  let data = params;
  return http.post(url,data,res=>{
    return res.data;
  },false);
}

function getUserList(params) {
  //console.log("123")
}


export default {
  userLogin: userLogin,
  getNavList: getNavList,
  postNavAdd: postNavAdd,
}

