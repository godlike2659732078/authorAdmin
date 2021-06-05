<template>
  <div>
    <!-- 不止一个项目，用div包裹起来 -->
    <div style="display: flex">
      <el-form label-width="50px" style="">
        <div
          class="attrBox"
          v-for="(item, index) in bsGoodsSpecificationEntities"
          :key="index"
        >
          <el-form-item label="规格名称:">
            <el-input
              v-model="item.name"
              style="width: 100px; margin-left: 0px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="克拉:">
            <el-input
              v-model="item.name1"
              style="width: 100px; margin-left: 0px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="尺寸:">
            <el-input
              v-model="item.name2"
              style="width: 100px; margin-left: 0px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="售价:">
            <el-input
              v-model="item.price"
              style="width: 100px; margin-right: 10px"
            ></el-input>
          </el-form-item>

          <el-form-item label="库存:">
            <el-input
              v-model="item.stock"
              style="width: 80px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片:">
            <el-upload
              class="avatar-uploader"
              action="http://admin.starchain.plus/file/upload"
              :on-success="handleimage"
              :show-file-list="false"
            >
              <img
                v-if="item.image != ''"
                :src="
                  'http://admin.starchain.plus:80/file/upload/' + item.image
                "
                @click="getIndex(index)"
                class="avatar"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                @click="getIndex(index)"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="deleteItem(item, index)"
              style="margin-left: 10px"
              type="primary"
              >删除</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>

    <el-button @click="addItem" type="primary">添加规格</el-button>
  </div>
</template>

<script>
import API from "../server/api";
export default {
  name: "sizePage",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sizeList: [{ bigSize: "", size: "" }],
      upUrl: API.POST_UPLOAD,
      loading: false,
      bsGoodsSpecificationEntities: this.form.bsGoodsSpecificationEntities || [
        {
          name: "",
          name1: "",
          name2: "",
          price: "",
          stock: "",
          image: "",
          goodsId: "",
        },
      ],
      index: 0,
    };
  },
  watch: {
    bsGoodsSpecificationEntities: {
      handler() {
        this.$emit("specification", this.bsGoodsSpecificationEntities); //自定义事件  传递值“子向父组件传值”
      },

      deep: true,
    },
  },
  methods: {
    // 商品图片上传
    handleimage(res, file) {
      console.log(res);
      console.log(this.index);
      console.log(this.bsGoodsSpecificationEntities);
      this.bsGoodsSpecificationEntities[this.index].image = res.result.fileName;
    },
    getIndex(index) {
      this.index = index;
    },
    deleteItem(item, index) {
      this.bsGoodsSpecificationEntities.splice(index, 1);
      console.log(this.bsGoodsSpecificationEntities);
    },
    addItem() {
      this.bsGoodsSpecificationEntities.push({
        name: "",
        name1: "",
        name2: "",
        price: "",
        stock: "",
        image: "",
        goodsId: this.form.id,
      });
    },

    successSizeImg(res) {
      if (res.code == 200) {
        this.sizeImg = res.result.fileName;
        this.sizeForm.image = res.result.webUrl;
        this.loading = false;
      } else {
        this.$message.error("上传失败");
      }
    },
    beforeAvatar(file) {
      this.loading = true;
      const isLt2M = file.size / 1024 / 1024 < 4;
      let isJPG = "";
      if (file.type === "image/jpeg" || file.type === "image/png") {
        isJPG = true;
      }
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      return isJPG && isLt2M;
    },
    detSize() {
      let data = this.sizeIndex;
      this.$emit("detSize", data);
    },
    getImageUrl(url) {
      return API.IMAGE_URL + "file/upload/" + url.split("/file/upload/")[1];
    },
  },
  mounted() {
    console.log(this.bsGoodsSpecificationEntities);
  },
};
</script>

<style scoped>
.avatar-uploader-icon {
  width: 40px !important;
  height: 40px !important;
  line-height: 40px;
  font-size: 18px;
}

.avatar {
  display: block !important;
  min-height: 40px !important;
  min-width: 40px !important;
  max-height: 40px !important;
  max-width: 40px !important;
  line-height: 40px;
}
.attrBox {
  display: flex;
  justify-content: left;
}
</style>
