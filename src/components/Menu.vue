<template>
  <div class="sidebar"></div>
</template>

<script>
// import bus from '../common/bus';
// @ is an alias to /src
export default {
  name: "Menu",
  props: {
    items: Array,
  },
  data() {
    return {
      // collapse: false,
    };
  },
  // 		created() {
  // 			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
  // 			bus.$on('collapse', msg => {
  // 				this.collapse = msg;
  // 			})
  // 		}
};
</script>
<style >
</style>
