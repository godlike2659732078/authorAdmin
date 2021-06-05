<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>章节列表</span>
      <span style="margin: 0 10px">/</span>
      <span>章节添加</span>
    </div>

    <!--分割线-->
    <el-divider></el-divider>
    <!--搜索框-->

    <div style="padding: 30px 50px; overflow-y: auto; height: 100%">
      <el-form ref="coinForm" :model="form" label-width="80px">
        <el-form-item label="第几章节">
          <el-input
            v-model.trim="form.section"
            placeholder="请输入本章节是'第几章'"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称">
          <el-input
            v-model.trim="form.sectionName"
            placeholder="请输入章节名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input
            v-model.trim="form.sort"
            placeholder="请输入章节对应的顺序数字"
          ></el-input>
        </el-form-item>

        <el-form-item label="文章内容" prop="url">
          <editor v-model="form.content" :isClear="isClear"></editor>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="addUser('form')">提 交</el-button>

          <el-button @click="closeDrawer('form')">返回</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        :visible.sync="dialogVisible"
        style="margin-top: -100px"
        :append-to-body="true"
      >
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import HTTP from "../../server/server";
import API from "../../server/api";
import editor from "../../components/editor";
export default {
  name: "articles",
  components: {
    editor,
  },
  data() {
    return {
      value: [],
      imageData: "",
      QiniuData: {
        key: "", //图片名字处理
        token: "", //七牛云token
      },

      dialogImageUrl: "",
      dialogVisible: false,
      detail: "",
      isClear: false,
      isClear_introduction1: false,
      isClear_introduction2: false,
      imgIndex: [],
      fileList: [],
      fileLists: [],
      drawer: false,
      upUrl: API.POST_UPLOAD,
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      introduction1: "",
      introduction2: "",

      classList: [],
      tagList: [],
      openList: [
        { name: "正常", id: 0 },
        { name: "下架", id: 1 },
      ],
      search_form: {
        page: 1,
        size: 10,
        sort: "createTime asc",
        name: "",
      },
      pageTotal: 0,
      form: {
        id: "",
        sort: "",
        section: "",
        sectionName: "",
        content: "",
      },
      tableData: [],
      coinList: [],
    };
  },
  methods: {
    closeDrawer() {
      this.$router.push({
        path: "/bookPartList",
        query: { id: this.$route.query.bookId },
      });
    },

    addUser() {
      let url = API.POSTBOOKCONTENTADD;
      let bookId = this.$route.query.bookId;
      console.log(bookId);
      this.form.bookId = this.$route.query.bookId;
      let data = this.form;
      console.log(data);
      HTTP.post(
        url,
        data,
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.loading4 = false;
            this.$message.success("成功");
            this.$router.push({
              path: "/bookPartList",
              query: { id: bookId },
            });
          }
        },
        false
      );
    },

    getTable() {
      this.loading5 = true;
      let url = API.POSTGETONEBOOKCONTENT;
      let data = {
        sectionId: this.$route.query.sectionId,
      };
      console.log(data);
      HTTP.frompost(
        url,
        data,
        (res) => {
          if (res) {
            console.log(res);
            this.form.section = res.data.section;
            this.form.sectionName = res.data.sectionName;
            this.form.sort = res.data.sort;
            this.form.content = res.data.content;
            this.form.id = this.$route.query.sectionId;
          }
        },
        false
      );
    },
    getImageUrl(url) {
      // console.log(url);
      if (url) {
        return url;
      }
    },
  },
  mounted() {
    if (this.$route.query.sectionId) {
      this.getTable();
    }
  },
};
</script>

<style scoped>
.leftBox {
  padding: 0px 32px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.nameBox,
.secBox,
.statusBox {
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  width: 100%;
  height: 88px;
  margin-bottom: 20px;
  padding: 24px 32px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: -2px 0px 5px 1px rgba(43, 108, 221, 0.2),
    0px -2px 5px 1px rgba(43, 108, 221, 0.2),
    2px 0px 5px 1px rgba(43, 108, 221, 0.2),
    0px 2px 5px 1px rgba(43, 108, 221, 0.2);
}
.contentTitle {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.htmlContent {
  height: 600px;
  border-radius: 4px;
  overflow-y: scroll;
  padding: 24px 32px;
  box-shadow: -2px 0px 5px 1px rgba(43, 108, 221, 0.2),
    0px -2px 5px 1px rgba(43, 108, 221, 0.2),
    2px 0px 5px 1px rgba(43, 108, 221, 0.2),
    0px 2px 5px 1px rgba(43, 108, 221, 0.2);
}
.nameTitle {
  font-size: 16px;
}

.rightBox {
  padding: 0px 32px;
  box-sizing: border-box;
  border-left: 1px solid #aaa;
}

.crumbsCon {
  padding-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.tableBody {
  width: 1400px;
  max-height: 800px;
  min-height: 600px;
  margin: -10px 20px 120px;
  padding: 10px 35px 130px;
  border-radius: 3px;
  background-color: #fff;
}

.tableCon {
  background-color: #e6e6e6;
  border-radius: 3px;
}

.page {
  background-color: #fff;
  padding: 10px 10px;
}
</style>
