<template>
  <div class="contentBox">
    <div class="contentAll">
      <img src="../../assets/home.png" alt="" />
      <div class="textBox" @click="gotoBookList">
        <i class="el-icon-edit editIcon"></i>
      </div>
      <div class="startBox" @click="gotoBookList">start</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoBookList() {
      this.$router.push("/bookList");
    },
  },
};
</script>
<style>
.contentBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20px -30px;
  max-height: 100%;
  background-image: url("../../assets/bj.jpg");
  background-size: 100% 100%;
}
.contentAll {
  position: relative;
}
.contentBox img {
  width: 1400px;
  height: 860px;
}
.textBox {
  width: 72px;
  height: 72px;
  font-size: 32px;

  background: #f5f5f523;
  border-radius: 30px;
  text-align: center;
  line-height: 72px;
  position: absolute;
  right: 149px;
  bottom: 253px;
  cursor: pointer;
}
.startBox {
  width: 110px;
  height: 110px;
  background: #ffea00;
  border-radius: 40px;
  font-size: 32px;
  font-family: Arial;
  font-weight: 400;
  text-align: center;
  line-height: 110px;
  color: #3067dd;
  position: absolute;
  right: 130px;
  bottom: 125px;

  cursor: pointer;
}
.editIcon {
  color: #fff;
  font-weight: bold;
  font-size: 30px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>