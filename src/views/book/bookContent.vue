<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>章节列表</span>
      <span style="margin: 0 10px">/</span>
      <span>章节详情</span>
    </div>

    <!--分割线-->
    <el-divider></el-divider>
    <!--搜索框-->

    <div style="padding: 10px 20px; height: 100%">
      <el-row style="padding-bottom: 100px">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="leftBox">
            <div class="nameBox">
              <p class="nameTitle">章节名称：</p>
              <p class="namecontent">{{ form.sectionName }}</p>
            </div>
            <div class="secBox">
              <p class="nameTitle">更新章节：</p>
              <p class="seccontent">{{ form.section }}</p>
            </div>
            <div class="statusBox">
              <p class="nameTitle">章节状态：</p>
              <el-tag v-if="form.status == 0" type="success" size="small"
                >正常</el-tag
              >
              <el-tag v-else-if="form.status == 1" size="small">下架</el-tag>
            </div>
            <div class="nameBox">
              <p class="nameTitle">审核状态：</p>
              <el-tag v-if="form.isCheck == 0" type="success" size="small"
                >待审核</el-tag
              >
              <el-tag v-else-if="form.isCheck == 1" size="small">审核中</el-tag>
              <el-tag v-else-if="form.isCheck == 2" size="small">通过</el-tag>
              <el-tag v-else-if="form.isCheck == 3" size="small">未通过</el-tag>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <div class="rightBox">
            <div class="contentTitle">章节内容：</div>
            <div class="htmlContent" v-html="form.content"></div></div></el-col
      ></el-row>

      <!-- <el-form ref="coinForm" :model="form" label-width="80px">
        <el-form-item label="章节名:">
          <el-input
            style="border: none"
            v-model.trim="form.sectionName"
          ></el-input>
        </el-form-item>

        <el-form-item label="章节状态:">
          <el-select style="width: 110px" disabled v-model="form.status">
            <el-option
              v-for="(item, index) in openList"
              :key="'class' + index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="更新章节:">
          <el-input v-model.trim="form.section"></el-input>
        </el-form-item>
        <el-form-item label="文章内容:" prop="url">
          <editor v-model="form.content" :isClear="isClear"></editor>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="goBack('form')">返回</el-button>
        </el-form-item>
      </el-form> -->
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
        bookId: "",
        content: "",
        name: "",
        tag: [],
        typeId: "",
        image: "",
        section: "第一章",
      },
      tableData: [],
      coinList: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getTable() {
      this.loading5 = true;
      let url = API.POSTGETONEBOOKCONTENT;
      let data = {
        sectionId: this.$route.query.id,
      };
      console.log(data);
      HTTP.frompost(
        url,
        data,
        (res) => {
          if (res) {
            console.log(res);

            this.form = res.data;
            // this.pageTotal = res.data.totalElements;
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
    this.getTable();
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
  min-height: 600px;
  margin: -10px 20px 0px;
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
