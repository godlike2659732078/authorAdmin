<template>
  <div class="form_container">
    <div class="mainLoginBox">
      <img src="../../assets/leftImage.png" alt="" />
    </div>
    <div class="rightBox">
      <div class="rightTop">
        <img src="../../assets/title.png" alt="" />
      </div>
      <div class="loginBox">
        <div class="userAccount">
          <input
            type="text"
            name=""
            v-model="loginUser.phone"
            placeholder="请输入作家账号"
            autocomplete="off"
            id=""
          />
        </div>
        <div class="userPwd">
          <input
            type="password"
            name=""
            v-model="loginUser.password"
            @keyup.enter.native="loginBtn()"
            placeholder="请输入登录密码"
            autocomplete="new-password"
            id=""
          />
        </div>
        <div class="loginBtn" @click="loginBtn()">登录</div>
      </div>
    </div>
    <!-- <div class="manage_tip">
      <span class="title">主播系统后台管理</span>
      <el-form
        :model="loginUser"
        status-icon
        ref="loginForm"
        class="loginForm"
        label-width="80px"
      >
        <el-form-item label="账号" prop="email">
          <el-input
            @keyup.enter="loginBtn"
            type="text"
            v-model.trim="loginUser.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            @keyup.enter.native="loginBtn"
            type="password"
            v-model.trim="loginUser.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="loginBtn()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div> -->
  </div>
</template>

<script>
import http from "../../server/server";
import API from "../../server/api";
// @ is an alias to /src
export default {
  name: "Register",
  data() {
    return {
      loginUser: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    //登录
    loginBtn() {
      if (!this.loginUser.phone) {
        this.$message("账号不能为空");
        return false;
      }
      if (!this.loginUser.password) {
        this.$message("密码不能为空");
        return false;
      }
      let data = {
        phone: this.loginUser.phone,
        password: this.loginUser.password,
      };
      let url = API.POSTLOGIN;
      http.frompost(
        url,
        data,
        (res) => {
          console.log(res);
          if (res.code == 200) {
            localStorage.setItem("access_token", res.data.token);
            http.get(API.GETUSERINFO, {}, (res) => {
              localStorage.setItem("username", res.data.username);
              this.$message.success("登录成功！");
              this.$router.push("/Home");
            });
          } else {
            console.log(res);
            this.$message.error("登录失败");
          }
        },
        false
      );
    },
  },
  mounted() {
    //查询缓存 直接进入
    if (localStorage.getItem("access_token")) {
      console.log(localStorage.getItem("access_token"));
      this.$router.push("/Home");
    }
  },
};
</script>

<style scoped>
.mainLoginBox {
}
.rightBox {
  margin-left: -200px;
  height: 580px;
  width: 800px;
}
.form_container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/bg.png) no-repeat center center;
  background-size: 100% 100%;
}
.loginBox {
  width: 100%;
  height: auto;
  padding: 60px 0px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.userAccount {
  width: 414px;
  height: 60px;
  background-image: url("../../assets/username.png");
  line-height: 60px;
}
.userAccount input {
  margin-left: 100px;
  background: none;
  border: none;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  -webkit-text-fill-color: #ffffff;
}
.userPwd {
  width: 414px;
  height: 60px;
  background-image: url("../../assets/pwd.png");
  line-height: 60px;
  margin-top: 34px;
}
input:-webkit-autofill {
  box-shadow: none;
}
input:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}
.userPwd input {
  margin-left: 100px;
  background: none;
  border: none;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  -webkit-text-fill-color: #ffffff;
}
*:focus {
  outline: none;
}
.loginBtn {
  width: 414px;
  height: 60px;
  margin-top: 86px;
  background: #3067dd;
  box-shadow: 0px 12px 88px 0px rgba(14, 62, 165, 0.26);
  border-radius: 8px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}

::-webkit-input-placeholder {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}

/* Firefox 4-18 */
:-moz-placeholder {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}

/* Firefox 19-50 */
::-moz-placeholder {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}

/* - Internet Explorer 10–11
   - Internet Explorer Mobile 10-11 */
:-ms-input-placeholder {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}

.manage_tip {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 50%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  margin-left: -185px;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.loginForm {
  margin-top: 20px;
  background-color: white;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
.submit_btn {
  width: 100%;
}
.info {
  float: right;
  font-size: 14px;
  color: #606266;
}
a {
  text-decoration: none;
}
</style>