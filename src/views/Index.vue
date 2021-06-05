<template>
  <div class="index">
    <!-- <Header></Header> -->
    <LeftMenu></LeftMenu>
    <div class="rightContainer" :class="{ 'content-collapse': collapse }">
      <transition name="move" mode="out-in">
        <keep-alive :include="tagsList">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import bus from "../common/bus";
// import moment from 'moment'
// @ is an alias to /src
export default {
  name: "Index",
  data() {
    return {
      tagsList: [],
      collapse: false,
    };
  },
  components: {
    Header,
    LeftMenu,
  },
  created() {
    //内容区域跟随变化
    bus.$on("collapse", (msg) => {
      console.log(msg);
      this.collapse = msg;
    }),
      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on("tags", (msg) => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
        // console.log(tags)
      });
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  width: 100%;
  height: 84%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.rightContainer.content-collapse {
  left: 48px;
}
.rightContainer {
  position: absolute;
  left: 0px;
  right: 0;
  height: 100%;
  padding: 20px 0px;
  margin-bottom: 100px;
  transition: left 0.3s ease-in-out;
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
</style>
