<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>书籍管理</span>
      <span style="margin: 0 10px">/</span>
      <span>书籍列表</span>
    </div>

    <!--分割线-->
    <el-divider></el-divider>
    <!--搜索框-->
    <!-- <el-form
      size="medium"
      :inline="true"
      :model="search_form"
      class="demo-form-inline"
    >
      <el-form-item label="书籍名称:">
        <el-input
          v-model.trim="search_form.name"
          placeholder="请输入书籍名称"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getTables()">查询</el-button>
      </el-form-item>
    </el-form> -->
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
      border
      v-loading="loading5"
    >
      <el-table-column prop="image" label="封面图" width="170" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.image"
            style="height: 35px"
            :src="getImageUrl(scope.row.image)"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name" label="书名">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="author"
        width="140"
        label="作者名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="typeName"
        width="140"
        label="分类"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="readNum"
        width="140"
        label="在读人数"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="section"
        width="140"
        label="更新章节"
        align="center"
      >
      </el-table-column>

      <el-table-column label="书籍状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success" size="small"
            >下架</el-tag
          >
          <el-tag v-else-if="scope.row.status == 1" size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        :show-overflow-tooltip="true"
        label="时间"
        width="160"
      >
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="getOne(scope.row)" size="mini"
            >编 辑 <i class="el-icon-edit el-icon--right"></i
          ></el-button>
          <el-button type="primary" size="mini" @click="gotoPart(scope.row)"
            >更新章节</el-button
          >
          <!--					<el-button type="text" @click="delBtn(scope.row.id)">删 除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <!-- <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search_form.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="search_form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div> -->

    <el-drawer
      :withHeader="false"
      :append-to-body="true"
      :wrapperClosable="false"
      :visible.sync="drawer"
      size="60%"
      :before-close="closeDrawer"
      direction="rtl"
    >
      <div style="padding: 30px 50px; overflow-y: auto; height: 100%">
        <el-form
          ref="coinForm"
          v-loading="loading4"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="书名">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>

          <el-form-item label="封面图">
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
          <el-form-item label="书籍分类">
            <el-cascader
              v-model="value"
              :options="classList"
              @change="handleChange"
            ></el-cascader>
            <!-- <el-select v-model.trim="form.typeId" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="书籍标签">
            <el-select v-model.trim="form.tag" multiple placeholder="请选择">
              <el-option
                v-for="item in tagList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="更新章节">
            <el-input v-model.trim="form.section"></el-input>
          </el-form-item>
          <el-form-item label="书籍简介">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入书籍简介信息(最大数字限制255)"
              v-model="form.content"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="addUser('form')">提 交</el-button>

            <el-button @click="closeDrawer('form')">取 消</el-button>
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
    </el-drawer>
  </div>
</template>

<script>
import HTTP from "../../server/server";
import API from "../../server/api";
import editor from "../../components/editor";
import sizePage from "../../components/sizePage";
export default {
  name: "articles",
  components: {
    editor,
    sizePage,
  },
  data() {
    return {
      value: [],
      imageData: "",
      QiniuData: {
        key: "", //图片名字处理
        token: "", //七牛云token
      },
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
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
        { name: "下架", id: 0 },
        { name: "正常", id: 1 },
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
    handleChange(value) {
      console.log(this.value);
    },

    // 规格模块
    updateSpec(e) {
      //声明这个函数
      this.form.bsGoodsSpecificationEntities = e;
    },
    change(val) {
      // console.log(val);
    },

    //分页
    handleSizeChange(val) {
      this.search_form.size = val;
      this.search_form.page = 1;
      this.getTable();
    },

    //分页
    handleCurrentChange(val) {
      this.search_form.page = val;
      this.getTable();
    },
    //
    addUser() {
      console.log(this.value);
      console.log(this.value[this.value.length - 1]);
      this.form.tag = this.form.tag.toString();
      this.form.typeId = this.value[this.value.length - 1];
      let url = API.POSTBOOKADD;
      let data = this.form;

      console.log(data);
      HTTP.frompost(
        url,
        data,
        (res) => {
          console.log(res);
          if (res.code == 200) {
            this.loading4 = false;
            this.$message.success("操作成功");
            this.closeDrawer();
            this.getTable();
          } else {
            this.$message.error("添加失败，请检查输入！");
          }
        },
        false
      );
    },

    //图片上传
    handleAvatarSuccess1(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
      if (res.key) {
        this.imageUrl1 = "http://qiniu.139e.com/" + res.key;
        this.form.image = res.key;
        this.loading1 = false;
      } else {
        this.$message.error("上传失败");
      }
    },
    getUpload() {
      HTTP.get(API.GETUPLOADTOKEN, {}, (res) => {
        let resdata = {};
        this.QiniuData.token = res.data.token;
        this.QiniuData.key = res.data.key;
        console.log(this.QiniuData);
      });
    },
    getUploadFile(res, file, fileList) {
      this.getUpload();
    },

    closeDrawer() {
      console.log(111);
      this.drawer = false;
      this.imageUrl1 = "";
      this.value = [];
      this.form = {
        bookId: "",
        content: "",
        name: "",
        tag: [],
        typeId: "",
        image: "",
        section: "第一章",
      };
      this.getTable();
      // console.log(this.form.bsGoodsSpecificationEntities);
    },
    getOne(row) {
      console.log(row);
      JSON.parse(JSON.stringify(row));
      this.drawer = true;
      this.form = {
        bookId: row.id,
        content: row.content,
        name: row.name,
        tag: "",
        typeId: row.typeId,
        image: row.image,
        section: row.section,
      };
      this.form.id = row.id;
      if (row.tag.length) {
      }
      let arr = row.tag.toString().split(",");
      this.form.tag = [];
      for (let i in arr) {
        this.form.tag.push(arr[i]);
      }
      //console.log(row.tag);
      // console.log(this.classList);
      // this.value = [1,row.typeId];
      this.value = [];
      for (let item of this.classList) {
        if (item.children) {
          for (let items of item.children) {
            //  console.log(items.id)
            // console.log(row.typeId)
            if (items.id == row.typeId) {
              //console.log(item)
              this.value.push(item.id, items.id);
            }
          }
        } else {
          if (item.id == row.typeId) {
            this.value.push(item.id);
          }
        }
      }
      console.log(this.value);
      if (this.form.image) {
        this.imageUrl1 = row.image;
        this.form.image = this.form.image.split("com/")[1];
      }
    },
    // 删除按钮
    gotoPart(row) {
      this.$router.push({ path: "/bookPartList", query: { id: row.id } });
    },
    getCoin() {
      let url = API.GETBOOKTAG;
      let data = {};
      HTTP.get(
        url,
        data,
        (res) => {
          //console.log(res);
          this.tagList = res.data;
        },
        false
      );
    },
    getTables() {
      this.search_form.page = 1;
      this.getTable();
    },
    getTable() {
      this.loading5 = true;
      let url = API.GETBOOKLIST;
      let data = this.search_form;
      //console.log(data);
      HTTP.get(
        url,
        data,
        (res) => {
          if (res.code == 200) {
            //console.log(res);
            this.loading5 = false;
            this.tableData = res.data;
            this.pageTotal = res.data.totalElements;
          } else {
            this.$message.error("请重新登录！");
          }
        },
        false
      );
    },
    getClassTable() {
      let url = API.GETCLASSTROEE;
      let data = {};
      HTTP.get(
        url,
        data,
        (res) => {
          // console.log(res);
          if (res.code == 200) {
            for (let item of res.data) {
              item.label = item.name;
              item.value = item.id;
              // this.getClassSon(item.id);
              if (item.wbasicBookTypeEntities.length > 0) {
                item.children = item.wbasicBookTypeEntities;
                for (let items of item.children) {
                  items.label = items.name;
                  items.value = items.id;
                }
              }
            }
            this.classList = res.data;

            console.log(this.classList);
          } else {
            this.$message.error(res.message);
          }
        },
        false
      );
    },
    // getClassSon(parentId) {
    //   let url = API.GETBOOKCLASS;
    //   let data = {
    //     parentId: parentId,
    //   };
    //   HTTP.get(
    //     url,
    //     data,
    //     (res) => {
    //       for (let item of this.classList) {
    //         if (item.id == parentId) {
    //           for (let items of res.data) {
    //             items.label = items.name;
    //             items.value = items.id;
    //           }
    //           item.children = res.data;
    //         }
    //       }
    //     },
    //     false
    //   );
    // },
    getImageUrl(url) {
      // console.log(url);
      if (url) {
        return url;
      }
    },
  },
  mounted() {
    this.getCoin();
    this.getTable();
    this.getClassTable();
    this.getUpload();
  },
};
</script>

<style scoped>
.el-input__inner {
  height: 56px !important;
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
  max-height: 800px;
  margin: 10px 20px 120px;
  padding: 30px 35px;
  border-radius: 3px;
  background-color: #f5f5f5;
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
