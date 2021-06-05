//axios 请求文件
import axios from "axios";
import qs from "qs";
import router from "../router";

const TIME_OUT_MS = 60 * 1000; // 默认请求超时时间
if (process.env.NODE_ENV === "development") {
  //axios.defaults.baseURL = "http://192.168.1.28:8902/";
  axios.defaults.baseURL = "http://wenyiapi.139e.com/";
} else {
  axios.defaults.baseURL = "http://wenyiapi.139e.com/";
}

// https request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("access_token")) {
      // 判断是否存在token，如果存在的话，则每个https header都加上token
      config.headers.Authorization = localStorage.getItem("access_token");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// https response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("response error :" + error);
    if (error.response) {
      switch (error.response.status) {
        case 512:
          localStorage.clear();
          router.push("/login");
          return false;
          console.log("token 过期");
          var config = error.config;
          refresh(config);
          return;
      }
    }

    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

/*
 * @param response 返回数据列表
 */
function handleResults(response) {
  var result = {};
  if (response.data.code == 512) {
    localStorage.clear();
    router.push("/login");
    return false;
  }
  if (response.status == "200") {
    result = response.data;
  }
  return result;
}

/*
 * @param data 参数列表
 * @return
 */
function handleParams(data) {
  return qs.stringify(data);
}

export default {
  /*
   * @param url
   * @param data
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  post(url, data, response, exception) {
    return new Promise((resolve, reject) => {
      axios({
          method: "post",
          //url: handleUrl(url),
          url: url,
          //data: handleParams(data),
          data: data,
          timeout: TIME_OUT_MS,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(result => {
          resolve(response(handleResults(result)));
        })
        .catch(error => {
          if (exception) {
            reject(exception(error));
          } else {
            reject(console.log(error));
          }
        });
    });
  },

  frompost(url, data, response, exception) {
    return new Promise((resolve, reject) => {
      axios({
          method: "post",
          //url: handleUrl(url),
          url: url,
          data: handleParams(data),
          //data: data,
          timeout: TIME_OUT_MS,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8 ",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(result => {
          resolve(response(handleResults(result)));
        })
        .catch(error => {
          if (exception) {
            reject(exception(error));
          } else {
            reject(console.log(error));
          }
        });
    });
  },

  /*
   * get 请求
   * @param url
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  get(url, data, response, exception) {
    return new Promise((resolve, reject) => {
      axios({
          method: "get",
          url: url,
          params: data,
          timeout: TIME_OUT_MS,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(result => {
          resolve(response(handleResults(result)));
        })
        .catch(error => {
          //console.log("error"+response);
          if (exception) {
            reject(exception(error));
          } else {
            //console.log(url)
            reject(console.log(error));
          }
        });
    });
  },

  /*
   * put 请求
   * @param url
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  put(url, data, response, exception) {
    return new Promise((resolve, reject) => {
      axios({
          method: "get",
          url: url,
          params: data,
          timeout: TIME_OUT_MS,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(result => {
          resolve(response(handleResults(result)));
        })
        .catch(error => {
          console.log("error" + response);
          if (exception) {
            reject(exception(error));
          } else {
            reject(console.log(error));
          }
        });
    });
  },

  /*
   * delete 请求
   * @param url
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  del(url, data, response, exception) {
    return new Promise((resolve, reject) => {
      axios({
          method: "delete",
          url: url,
          params: data,
          timeout: TIME_OUT_MS,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(result => {
          resolve(response(handleResults(result)));
        })
        .catch(error => {
          console.log("error" + response);
          if (exception) {
            reject(exception(error));
          } else {
            reject(console.log(error));
          }
        });
    });
  }
};