<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>书籍管理</span>
      <span style="margin: 0 10px">/</span>
      <span>书籍标签</span>
    </div>
    <!--分割线-->
    <el-divider></el-divider>
    <!--添加按钮-->
    <el-form
      style="background-color: #e6e6e6"
      size="medium"
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item style="margin: 10px 5px" label="">
        <el-button type="primary" @click="drawer = true">添 加</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" width="160" align="center" label="名称">
      </el-table-column>
      <el-table-column prop="image" align="center" width="100" label="图片">
        <template slot-scope="scope">
          <img
            style="height: 35px"
            :src="getImageUrl(scope.row.image)"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="简介"> </el-table-column>
      <el-table-column prop="createTime" label="更新时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!--{{scope.row.id}}-->

          <!--<el-button type="text" size="small">查 看</el-button>-->
          <el-button type="text" size="small" @click="openEdit(scope.row)"
            >编 辑</el-button
          >
          <el-button type="text" size="small" @click="delBtn(scope.row.id)"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--表单-->
    <el-drawer
      :withHeader="false"
      :append-to-body="true"
      :wrapperClosable="false"
      :visible.sync="drawer"
      :before-close="closeDrawer"
      direction="rtl"
    >
      <div style="padding: 30px 50px; overflow-y: auto; height: 100%">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model.trim="form.name"
              placeholder="请输入标签名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="标签图">
            <el-upload
              action="http://up-z2.qiniup.com/"
              :data="QiniuData"
              v-loading="loading1"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="getUploadFile"
            >
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签简介">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入标签简述"
              v-model.trim="form.content"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="addForm('form')">提 交</el-button>
            <el-button @click="closeDrawer('form')">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!--表单-->
    <el-drawer
      :withHeader="false"
      :append-to-body="true"
      :wrapperClosable="false"
      :visible.sync="editdrawer"
      :before-close="closeDrawer"
      direction="rtl"
    >
      <div style="padding: 30px 50px; overflow-y: auto; height: 100%">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model.trim="form.name"
              placeholder="请输入标签名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="标签图">
            <el-upload
              action="http://up-z2.qiniup.com/"
              :data="QiniuData"
              v-loading="loading1"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="getUploadFile"
            >
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签简介">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入标签简述"
              v-model.trim="form.content"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="addForm('form')">提 交</el-button>
            <el-button @click="closeDrawer('form')">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import HTTP from "../../server/server";
import API from "../../server/api";
import qs from "qs";
export default {
  name: "navList",
  data() {
    return {
      imageData: "",
      imageUrl1: "",
      upUrl: API.POST_UPLOAD,
      drawer: false,
      editdrawer: false,
      tableData: [],
      loading1: false,
      form: {
        id: "",
        name: "",
        image: "",
        content: "",
      },
      rules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
      },
      QiniuData: {
        key: "", //图片名字处理
        token: "", //七牛云token
      },
    };
  },
  methods: {
    getImageUrl(url) {
      if (url) {
        return API.IMAGE_URL + url;
      }
    },
    //图片上传
    handleAvatarSuccess1(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
     
      if (res.key) {
        this.imageUrl1 = "http://wenyiimg.chainmall.pro/" + res.key;
        this.form.image = res.key;
        this.loading1 = false;
      } else {
        this.$message.error("上传失败");
      }
    },
    getUpload() {
      HTTP.get(API.GETUPLOADTOKEN, {}, (res) => {
        this.QiniuData.token = res.data.token;
        this.QiniuData.key = res.data.key;
        console.log(this.QiniuData);
      });
    },
    getUploadFile(res, file, fileList) {
      this.getUpload();
    },

    //关闭编辑页面
    closeDrawer(formName) {
      this.form = {
        name: "",
        image: "",
        content: "",
        id: "",
      };
      this.imageUrl1 = "";
      this.drawer = false;
      this.editdrawer = false;
    },
    addBtn(id) {
      this.drawer = true;
    },
    //删除
    delBtn(id) {
      this.$confirm("此操作将永久删除此项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url = API.DELBOOKTAG;
          let data = {
            id: id,
          };
          HTTP.del(
            url,
            data,
            (res) => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getTable();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败",
                });
              }
            },
            false
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openEdit(row) {
      this.editdrawer = true;
      this.form = {
        name: row.name,
        content: row.content,
        id: row.id,
        image: row.image,
      };
      console.log(this.form);
      if (row.image) {
        this.imageUrl1 = API.IMAGE_URL + row.image;
      }
    },
    addForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = qs.stringify(this.form);
          let url = API.POSTBOOKTAG + "?" + data;
          HTTP.post(
            url,
            data,
            (res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("操作成功");
                this.closeDrawer(formName);
                this.getTable();
              } else {
                this.closeDrawer(formName);
                this.$message.error(res.msg);
              }
            },
            false
          );
        } else {
          return false;
        }
      });
    },

    getTable() {
      let url = API.GETBOOKTAG;
      let data = {};
      HTTP.get(
        url,
        data,
        (res) => {
          console.log(res);
          for (let item of res.data) {
            item.children = [];
            item.hasChildren = true;
          }
          this.tableData = res.data;
          console.log(this.tableData);
        },
        false
      );
    },
  },
  mounted() {
    this.getTable();
    this.getUpload();
  },
};
</script>

<style scoped>
.tableBody {
  margin: 30px 20px;
  padding: 30px 35px;
  border-radius: 3px;
  background-color: #fff;
}

.tableCon {
  background-color: #e6e6e6;
  border-radius: 3px;
}

.pageNum {
  background-color: #fff;
  padding: 10px 10px;
}
</style>
