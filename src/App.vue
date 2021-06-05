<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  created() {
    //持久化登录
    if (localStorage.eleToken) {
      //获取token解析
      const decode = jwt_decode(localStorage.eleToken);
      //存储vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUSER", decode);
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>


<style>
.el-pagination {
  text-align: center;
}
.el-table--border th .cell {
  font-size: 14px;
  font-weight: bold;
  color: #383737;
}
.crumbsCon {
  font-weight: bold;
  font-size: 16px;
  color: #141517;
}
.el-form-item__label {
  font-size: 16px;
  font-weight: bold;
}
.el-button--medium {
  font-size: 14px !important;
  font-weight: bold !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /*display: flex;*/
  background: #ffffff;
}

.header {
  height: 60px;
  background-color: #141517;
  width: 100%;
  line-height: 60px;
}
.loginCon {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.loginCon img {
  height: 35px;
}
.webTitle {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-left: 20px;
  line-height: 24px;
}
.rightBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 35px;
}
.adminName {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.headImg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  /*margin-left: 15px;*/
}
.topUserCon {
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: space-between;
}
.iconfont {
  font-size: 20px;
}
.goOutBtn {
  height: 35px;
  line-height: 35px;
  display: flex;
  margin-left: 20px;
  padding: 0 7px;
  cursor: pointer;
}
.goOutBtn:hover {
  color: #e7e1cd;
}

.bodyCon {
  height: calc(100% - 60px);
}
.el-drawer__body {
  overflow: auto;
}
</style>
