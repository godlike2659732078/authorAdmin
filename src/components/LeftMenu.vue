<template>
  <div class="sidebar">
    <el-row class="menu_page">
      <div :span="2" class="logo-container">
        <!-- <img src="./../assets/logo.png" alt="" class="logo"> -->
        <!-- 折叠按钮 -->
        <div class="collapse-btn">
          <img
            style="width: 74px; height: 48px"
            src="../assets/logo.png"
            alt=""
          />
          <div
            style="
              width: 400px;
              font-weight: bold;
              margin-left: 20px;
              color: #3067dd;
              font-size: 22px;
            "
          >
            链上文艺-作家操作平台
          </div>
        </div>
      </div>
      <div class="topNav">
        <el-menu
          mode="horizontal"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
        >
          <template v-for="item in items">
            <router-link :to="item.path" v-if="item.path">
              <el-menu-item
                v-if="item.children == null || item.children.length == 0"
                :index="item.path"
              >
                <!-- <i :class="item.icon" style="color: white"></i> -->
                <span>{{ item.name }}</span>
              </el-menu-item>
            </router-link>
            <!-- 判断是否有二级路由 -->
            <el-submenu v-if="item.children" :index="item.path">
              <template slot="title">
                <i :class="item.icon" style="color: white"></i>
                <span>{{ item.name }}</span>
              </template>
              <!--递归组件，把遍历的值传回子组件，完成递归调用-->
              <!-- <Menu :items="item.children" /> -->
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="user">
        <div class="btn-fullscreen icon-font"></div>
        <div class="userinfo">
          <div class="logOut"><i></i></div>
          <span class="username" @click="logout">
            <img src="../assets/logout.png" alt="" />
            <div class="logoOutTitle">退出</div>
            <!-- <el-dropdown trigger="click" @command="setDialogInfo">
              <div class="welcome">
                <p class="name comename">欢迎</p>
                <p class="name avatarname">{{ userNAme }}</p>
              </div>
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </span>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import bus from "../common/bus";
import Menu from "./Menu";
import Bscroll from "better-scroll";
import theme from "../common/theme";
import Aplayer from "vue-aplayer";
// @ is an alias to /src
export default {
  name: "LeftMenu",
  data() {
    return {
      collapse: false, //菜单栏是否闭合
      fullscreen: false,
      showlrc: true,
      userNAme: "",
      items: [
        {
          icon: "el-icon-s-claim",
          name: "首页",
          path: "/Home",
        },
        {
          icon: "el-icon-s-claim",
          name: "作家专区",
          path: "/bookList",
        },
      ],
    };
  },
  components: {
    Menu,
    theme,
    Aplayer,
  },
  computed: {
    users() {
      //通过vuex获取用户信息
      return this.$store.getters.user;
    },
  },
  methods: {
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    handleLockScreen() {
      this.$confirm("是否要进行锁屏?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "锁屏成功!",
          });
          setTimeout(() => {
            this.$router.push("/lock");
          }, 100);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "锁屏失效",
          });
        });
    },
    showInfoList() {
      // console.log('下来菜单')
      this.$router.push("/Infoshow");
    },
    logout() {
      localStorage.clear();
      //路由跳转
      this.$router.push("/login");
    },
    collapseChage() {
      //点击隐藏左侧菜单栏，
      this.collapse = !this.collapse;
      //非父子组件传值
      bus.$emit("collapse", this.collapse);
    },
    handleFullScreen() {
      //获取到整个html
      let element = document.documentElement;
      // console.log(element)
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // initScroll() {
    //   this.scroll = new Bscroll(this.$refs.wrapper, {});
    // },
  },
  mounted() {
    this.userNAme = localStorage.getItem("username");
    // this.$nextTick(() => {
    //   this.initScroll();
    // });
  },
  created() {
    // // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    // bus.$on("collapse", (msg) => {
    //   this.collapse = msg;
    // });
  },
};
</script>
<style scoped>
.user {
  /* line-height: 60px; */
  display: flex;
  justify-content: space-between;
  text-align: right;
  float: right;
  /* padding-right: 10px; */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  margin-left: 20px;
}

.welcome {
  display: inline-block;
  width: 60px;
  vertical-align: middle;
  padding: 0 5px;
}

.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}

.comename {
  font-size: 12px;
}

.avatarname {
  color: #163f99;
  font-weight: bolder;
}

.username {
  width: 100px;
  cursor: pointer;
  margin: 0px 20px 0px 40px;
  display: flex;
  align-items: center;
}
.logoOutTitle {
  color: #818181;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
}
.el-dropdown {
  width: 100px;
  color: #163f99;
}

.btn-fullscreen {
  display: inline-block;
  font-size: 24px;
  vertical-align: middle;
  margin-right: 20px;
  transform: rotate(45deg);
  cursor: pointer;
}

.icon-font {
  transform: none;
}

a {
  text-decoration: none;
  color: #163f99;
}

.icon-font i {
  font-size: 20px;
}

.userinfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #163f99;
}
.logo-container {
  line-height: 80px;
  min-width: 100px;
  padding: 0 5px;
}

.collapse-btn {
  width: 600px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.topNav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 40px;
}
.menu_page {
  /* position: fixed;
  left: 0; */
  height: 80px;
  background-color: #fff;

  z-index: 99;
  display: flex;
  justify-content: left;
}
.sidebar {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 10px 5px #f5f5f5;
  padding: 0px 60px;
  box-sizing: border-box;
}

.sidebar::-webkit-scrollbar {
  width: 1000px;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.el-menu {
  border: none;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-content: center;
}
.el-menu-item {
  box-shadow: 0px 4px 6px 0px rgba(14, 62, 165, 0.12);
  text-align: center;
  width: 167.6px;
  height: 46px;
  line-height: 46px;
  border-radius: 10px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #3067dd;
}
.el-menu-item.is-active {
  text-align: center;
  background-color: #3067dd !important;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fff !important;
  border-radius: 16px;
  width: 167.6px;
  height: 46px;
  border-radius: 16px;
  line-height: 46px;
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.473); */
}
.fa-margin {
  margin-right: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  /* min-height: 400px; */
}

.el-menu-vertical-demo {
  background-color: "#fff";
  color: "#163f99";
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.el-menu-vertical-demo a {
  height: 46px;
  /* border: 1px solid #163f99; */
  border-radius: 16px;
  margin-right: 20px;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}

a {
  text-decoration: none;
}
</style>

