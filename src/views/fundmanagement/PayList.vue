<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>主播管理</span>
      <span style="margin: 0 10px">/</span>
      <span>审核列表</span>
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
      <el-form-item label="主播账号">
        <el-input
          v-model.trim="search_form.account"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="主播状态">
        <el-select style="width: 110px" v-model="search_form.status">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
      <el-table-column prop="image1" label="图片" width="100" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.imgOne"
            style="height: 35px"
            :src="getImageUrl(scope.row.imgOne)"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="account"
        width="200"
        label="账号"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="country"
        width="120"
        label="国家"
        align="center"
      >
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="anchorType"
        width="140"
        label="主播类型"
        align="center"
      >
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 2" type="danger" size="small"
            >未通过</el-tag
          >
          <el-tag v-else-if="scope.row.status == 1" type="success" size="small"
            >已通过</el-tag
          >
          <el-tag v-else-if="scope.row.status == 0" type="primary" size="small"
            >未审核</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="email"
        width="140"
        label="邮箱"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="facebookAccount"
        width="140"
        label="Facebook账号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="youtubeAccount"
        width="140"
        label="YouTube账号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="twitterAccount"
        width="140"
        label="Twitter账号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="tiktokAccount"
        width="140"
        label="tittok账号"
        align="center"
      >
      </el-table-column>

      <el-table-column prop="createTime" label="时间" width="160">
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="getOne(scope.row)">审核</el-button>
          <!-- <el-button type="text" @click="delOne(scope.row)">删 除</el-button> -->
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
          <el-form-item label="用户账号">
            <el-input v-model.trim="form.account"></el-input>
          </el-form-item>

          <el-form-item label="图片1">
            <el-image
              style="width: 150px; height: 150px"
              :src="form.imgOne"
              :preview-src-list="[form.imgOne]"
            >
            </el-image>
          </el-form-item>
          <el-form-item label="图片2">
            <el-image
              style="width: 150px; height: 150px"
              :src="form.imgTwo"
              :preview-src-list="[form.imgTwo]"
            >
            </el-image>
          </el-form-item>
          <el-form-item label="图片3">
            <el-image
              style="width: 150px; height: 150px"
              :src="form.imgThree"
              :preview-src-list="[form.imgThree]"
            >
            </el-image>
          </el-form-item>
          <el-form-item label="国家">
            <el-input v-model.trim="form.country"></el-input>
          </el-form-item>
          <el-form-item label="主播类型">
            <el-input v-model.trim="form.anchorType"></el-input>
          </el-form-item>
          <el-form-item label="主播邮箱">
            <el-input v-model.trim="form.email"></el-input>
          </el-form-item>
          <el-form-item label="YouTube账号">
            <el-input v-model.trim="form.youtubeAccount"></el-input>
          </el-form-item>
          <el-form-item label="Twitter账号">
            <el-input v-model.trim="form.twitterAccount"></el-input>
          </el-form-item>
          <el-form-item label="Tik Tok账号">
            <el-input v-model.trim="form.tiktokAccount"></el-input>
          </el-form-item>
          <el-form-item label="Facebook账号">
            <el-input v-model.trim="form.facebookAccount"></el-input>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-select style="width: 110px" v-model="form.status">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.status == 2" label="驳回原因">
            <el-input v-model.trim="form.facebookAccount"></el-input>
          </el-form-item>

          <el-form-item label="" v-if="form.status == 0">
            <el-button type="primary" @click="editUser('form')">提交</el-button>
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
export default {
  name: "articles",
  components: {
    editor,
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
      statusList: [
        {
          value: 0,
          label: "未审核",
        },
        {
          value: 1,
          label: "已通过",
        },
        {
          value: 2,
          label: "未通过",
        },
      ],
      classList: [],
      openList: [
        { name: "通过", id: 1 },
        { name: "驳回", id: 0 },
      ],
      search_form: {
        name: "",
        pageNum: 1,
        pageSize: 10,
        sort: "createTime price",
        status: "",
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
      this.form = JSON.parse(JSON.stringify(row));
      this.fileLists = [];

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
      let url = API.POSTAUDITLIST;
      let data = this.search_form;
      console.log(data);
      HTTP.post(
        url,
        data,
        (res) => {
          if (res) {
            console.log(res);

            this.loading5 = false;
            this.tableData = res.data;
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
        return API.IMAGE_URL + url;
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
