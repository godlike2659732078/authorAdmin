<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>主播管理</span>
      <span style="margin: 0 10px">/</span>
      <span>主播列表</span>
    </div>

    <!--分割线-->
    <el-divider></el-divider>
    <!--搜索框-->
    <el-form
      size="medium"
      :inline="true"
      :model="search_form"
      class="demo-form-inline"
    >
      <el-form-item label="商品名称">
        <el-input
          v-model.trim="search_form.name"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getTables()">查询</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column prop="image1" label="图片" width="170" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.image1"
            style="height: 35px"
            :src="getImageUrl(scope.row.image1.split(',')[0])"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name" label="名称">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="price"
        width="140"
        label="单价"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="sort"
        width="100"
        label="排序"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="code"
        width="140"
        label="返佣币种"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="type"
        width="140"
        label="支付方式"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="rate"
        width="140"
        label="返佣比例"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="release"
        width="140"
        label="释放数量"
        align="center"
      >
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.open == 1" type="success" size="small"
            >上架</el-tag
          >
          <el-tag v-else-if="scope.row.open == 0" size="small">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间" width="160">
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="getOne(scope.row)">编 辑</el-button>
          <el-button type="text" @click="delOne(scope.row)">删 除</el-button>
          <!--					<el-button type="text" @click="delBtn(scope.row.id)">删 除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pageNum">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search_form.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="search_form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div>

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
          <el-form-item label="商品名称">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>
          <el-form-item label="图片1">
            <el-upload
              :action="upUrl"
              :file-list="fileLists"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-success="success"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片2">
            <el-upload
              v-loading="loading2"
              class="avatar-uploader"
              :action="upUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2"
            >
              <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片3">
            <el-upload
              v-loading="loading3"
              class="avatar-uploader"
              :action="upUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload3"
            >
              <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select style="width: 110px" v-model="form.classId">
              <el-option
                v-for="(item, index) in classList"
                :key="'class' + index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select style="width: 110px" v-model="form.open">
              <el-option
                v-for="(item, index) in openList"
                :key="'class' + index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品排序">
            <el-input v-model.trim="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="商品单价">
            <el-input v-model.trim="form.price"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <sizePage
              v-if="drawer"
              v-on:specification="updateSpec"
              v-bind:form="form"
            ></sizePage>
          </el-form-item>

          <el-form-item label="返佣币种">
            <el-select style="width: 110px" v-model="form.coinId">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="(item, coinInd) in coinList"
                :key="coinInd"
                :label="item.code"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model.trim="form.unit"></el-input>
          </el-form-item>
          <el-form-item label="返佣比例">
            <el-input v-model.trim="form.rate"></el-input>
          </el-form-item>
          <el-form-item label="交易方式">
            <el-select v-model.trim="form.type" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="释放参数">
            <el-input v-model.trim="form.release"></el-input>
          </el-form-item>
          <el-form-item label="产品简介">
            <editor
              v-model="introduction1"
              :isClear="isClear_introduction1"
              @change="change"
            ></editor>
          </el-form-item>
          <el-form-item label="规格简介">
            <editor
              v-model="introduction2"
              :isClear="isClear_introduction2"
              @change="change"
            ></editor>
          </el-form-item>
          <el-form-item label="详情" prop="url">
            <editor
              v-model="form.context"
              :isClear="isClear"
              @change="change"
            ></editor>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" v-if="form.id" @click="editUser('form')"
              >更新</el-button
            >
            <el-button type="primary" v-else @click="addUser('form')"
              >提 交</el-button
            >

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
      options: [
        {
          value: "ETH",
          label: "ETH",
        },
        {
          value: "BTC",
          label: "BTC",
        },
        {
          value: "USDT",
          label: "USDT",
        },
        {
          value: "SCT",
          label: "SCT",
        },
      ],
      classList: [],
      openList: [
        { name: "上架", id: 1 },
        { name: "下架", id: 0 },
      ],
      search_form: {
        name: "",
        pageNum: 1,
        pageSize: 10,
        sort: "createTime price",
      },
      pageTotal: 0,
      form: {
        bsGoodsSpecificationEntities: [
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
        classId: "",
        coinId: "",
        price: "",
        name: "",
        type: "",
        image1: "",
        image2: "",
        image3: "",
        context: "",
        introduction: "",
        rate: "",
        release: "",
        id: "",
        unit: "",
      },
      tableData: [],
      coinList: [],
    };
  },
  methods: {
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
      this.search_form.pageSize = val;
      this.search_form.pageNum = 1;
      this.getTable();
    },

    //分页
    handleCurrentChange(val) {
      this.search_form.pageNum = val;
      this.getTable();
    },
    //
    addUser() {
      console.log(this.fileList);
      this.form.image1 = this.fileList.toString();
      this.form.introduction = this.introduction1 + "|" + this.introduction2;
      console.log(this.form);

      // this.loading4 = true;
      let url = API.GET_GOODADD;
      this.form.type = this.form.type.toString();
      this.form.goodsType = 0;
      let data = this.form;
      console.log(data);
      console.log(data.introduction.split("|"));
      HTTP.post(
        url,
        data,
        (res) => {
          console.log(res);
          if (res.code == 0) {
            this.loading4 = false;
            this.$message.success("成功");
            this.getTable();
            this.closeDrawer();
          }
        },
        false
      );
    },
    editUser() {
      console.log(this.fileList);
      this.form.image1 = this.fileList.toString();
      this.form.introduction = this.introduction1 + "|" + this.introduction2;
      console.log(this.form);
      // this.loading4 = true;
      let url = API.POST_GOODLISTEDIT;
      this.form.type = this.form.type.toString();
      this.form.goodsType = 0;
      let data = this.form;
      console.log(data);
      HTTP.post(
        url,
        data,
        (res) => {
          console.log(res);
          if (res.code == 0) {
            this.loading4 = false;
            this.$message.success("成功");
            this.getTable();
            this.closeDrawer();
          }
        },
        false
      );
    },
    success(response, file, fileList) {
      console.log(response);
      this.fileList.push(response.result.fileName);
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      console.log(file.url);
      for (let item in this.fileList) {
        if (
          file.url.split("group1/")[1] ==
          this.fileList[item].split("group1/")[1]
        ) {
          this.fileList.splice(item, 1);
        }
      }
      console.log(this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传
    // handleAvatarSuccess1(res) {
    //   // console.log(res);
    //   if (res.code == 200) {
    //     this.imageUrl1 = res.result.webUrl;
    //     this.form.image1 = res.result.fileName;
    //     this.loading1 = false;
    //   } else {
    //     this.$message.error("上传失败");
    //   }
    // },
    // beforeAvatarUpload1(file) {
    //   var isJPG = "";
    //   const isLt2M = file.size / 1024 / 1024 < 4;

    //   if (file.type === "image/jpeg" || file.type === "image/png") {
    //     isJPG = true;
    //   }
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 4MB!");
    //   }
    //   this.loading1 = true;
    //   return isJPG && isLt2M;
    // },
    //图片上传
    handleAvatarSuccess2(res) {
      if (res.code == 200) {
        this.imageUrl2 = res.result.webUrl;
        this.form.image2 = res.result.fileName;
        this.loading2 = false;
      } else {
        this.$message.error("上传失败");
      }
    },
    beforeAvatarUpload2(file) {
      var isJPG = "";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (file.type === "image/jpeg" || file.type === "image/png") {
        isJPG = true;
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      this.loading2 = true;
      return isJPG && isLt2M;
    },
    //图片上传
    handleAvatarSuccess3(res) {
      if (res.code == 200) {
        this.imageUrl3 = res.result.webUrl;
        this.form.image3 = res.result.fileName;
        this.loading3 = false;
      } else {
        this.$message.error("上传失败");
      }
    },
    beforeAvatarUpload3(file) {
      var isJPG = "";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (file.type === "image/jpeg" || file.type === "image/png") {
        isJPG = true;
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      this.loading3 = true;
      return isJPG && isLt2M;
    },

    closeDrawer() {
      this.drawer = false;
      this.fileLists = [];
      this.fileList = [];
      this.form = {
        bsGoodsSpecificationEntities: [
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
        classId: "",
        coinId: "",
        price: "",
        name: "",
        type: "",
        image1: "",
        image2: "",
        image3: "",
        context: "",
        introduction: "",
        rate: "",
        release: "",
        id: "",
        unit: "",
      };
      // console.log(this.form.bsGoodsSpecificationEntities);
    },
    getOne(row) {
      this.introduction1 = row.introduction.split("|")[0];
      this.introduction2 = row.introduction.split("|")[1];
      this.form = JSON.parse(JSON.stringify(row));
      this.fileLists = [];
      this.form.type = row.type.split(",");
      console.log(row.type.split(","));
      console.log(row.introduction.split("|")[0]);
      console.log(this.form);
      if (this.form.image1) {
        //192.168.10.181:8900
        // 3.10.119.116
        this.fileList = this.form.image1.split(",");
        let imageList = this.form.image1.split("file/upload/")[1].split(",");

        for (let item of imageList) {
          this.fileLists.push({
            url: "https://admin.starchain.plus/file/upload/" + item,
          });
        }
      }

      console.log(this.fileLists);
      this.drawer = true;
      console.log(this.form);
    },
    // 删除按钮
    delOne(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url = API.GET_GOODSDEL;
          let data = {
            goodsId: row.id,
          };
          HTTP.get(
            url,
            data,
            (res) => {
              console.log(res);
              if (res.code == 0) {
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
    getCoin() {
      let url = API.GET_COINNAME;
      let data = {};
      HTTP.get(
        url,
        data,
        (res) => {
          this.coinList = res.result;
        },
        false
      );
    },
    getTables() {
      this.search_form.pageNum = 1;
      this.getTable();
    },
    getTable() {
      this.loading5 = true;
      let url = API.GET_GOODLIST;
      this.search_form.goodsType = 0;
      let data = this.search_form;
      console.log(data);
      HTTP.get(
        url,
        data,
        (res) => {
          if (res) {
            console.log(res);

            this.loading5 = false;
            this.tableData = res.data.content;
            this.pageTotal = res.data.totalElements;
          }
        },
        false
      );
    },
    getClassTable() {
      let url = API.GET_CLASSLIST;
      let data = {
        type: 1,
      };
      HTTP.get(
        url,
        data,
        (res) => {
          if (res.code == 0) {
            this.classList = res.data;
          } else {
            this.$message.error(res.message);
          }
        },
        false
      );
    },
    getImageUrl(url) {
      // console.log(url);
      if (url) {
        return API.IMAGE_URL + "file/upload/" + url.split("/file/upload/")[1];
      }
    },
  },
  created() {
    this.getCoin();
    this.getTable();
    this.getClassTable();
  },
};
</script>

<style scoped>
.tableBody {
  margin: 10px 10px;
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
