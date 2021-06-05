<template>
  <div class="tableBody">
    <!--面包屑-->
    <div class="crumbsCon">
      <span>书籍管理</span>
      <span style="margin: 0 10px">/</span>
      <span>章节列表</span>
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
      <el-form-item label="章节名称">
        <el-input
          v-model.trim="search_form.name"
          placeholder="请输入章节名称"
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
        <el-button type="primary" @click="gotoPartAdd()">添加章节</el-button>
      </el-form-item>
    </el-form>

    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      border
      v-loading="loading5"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="bookName"
        width="140"
        label="书籍名称"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="section" label="章节" width="100" align="center">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="sectionName"
        label="章节名称"
      >
      </el-table-column>
      <el-table-column label="章节状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success" size="small"
            >正常</el-tag
          >
          <el-tag v-else-if="scope.row.status == 1" size="small">下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="审核状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success" size="small"
            >待审核</el-tag
          >
          <el-tag v-else-if="scope.row.status == 1" size="small">审核中</el-tag>
          <el-tag v-else-if="scope.row.status == 2" size="small">通过</el-tag>
          <el-tag v-else-if="scope.row.status == 3" size="danger"
            >未通过</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="lastUpdateTime"
        align="center"
        label="时间"
        width="160"
      >
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="getOne(scope.row)" size="mini"
            >编 辑 <i class="el-icon-edit el-icon--right"></i
          ></el-button>
          <el-button type="primary" size="mini" @click="getAll(scope.row)"
            >查看详情</el-button
          >

          <!--					<el-button type="text" @click="delBtn(scope.row.id)">删 除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="page">
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
    </div>

    <el-drawer
      :withHeader="false"
      :append-to-body="true"
      :wrapperClosable="false"
      :visible.sync="drawer"
      size="90%"
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
          <el-form-item label="章节">
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
            <editor
              v-model="form.content"
              :isClear="isClear"
              @change="change"
            ></editor>
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

      imgIndex: [],
      fileList: [],
      fileLists: [],
      drawer: false,
      upUrl: API.POST_UPLOAD,
      imageUrl1: "",

      classList: [],
      tagList: [],
      openList: [
        { name: "下架", id: 1 },
        { name: "正常", id: 0 },
      ],
      search_form: {
        page: 1,
        size: 10,
        sort: "createTime desc",
        bookId: "",
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
    gotoPartAdd() {
      this.$router.push({
        path: "/bookPartAdd",
        query: { bookId: this.$route.query.id },
      });
    },
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
      let url = API.POSTBOOKCONTENTADD;
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
            this.getTable();
            this.closeDrawer();
          }
        },
        false
      );
    },

    closeDrawer() {
      this.drawer = false;
      this.fileLists = [];
      this.fileList = [];
      this.form = {
        id: "",
        section: "",
        sectionName: "",
        content: "",
        sort: "",
      };
      // console.log(this.form.bsGoodsSpecificationEntities);
    },
    getOne(row) {
      this.$router.push({
        path: "/bookPartAdd",
        query: { sectionId: row.id, bookId: this.$route.query.id },
      });
      console.log(row);
    },

    getAll(row) {
      this.$router.push({ path: "/bookContent", query: { id: row.id } });
      // let url = API.POSTGETONEBOOKCONTENT;
      // let data = {
      //   sectionId: row.id,
      // };
      // console.log(data);
      // HTTP.frompost(
      //   url,
      //   data,
      //   (res) => {
      //     if (res) {
      //       console.log(res);
      //       // this.loading5 = false;
      //       // this.tableData = res.data.content;
      //       // this.pageTotal = res.data.totalElements;
      //     }
      //   },
      //   false
      // );
    },
    getTables() {
      this.search_form.page = 1;
      this.getTable();
    },
    getTable() {
      this.loading5 = true;
      let url = API.GETBOOKCONTENT;
      this.search_form.bookId = this.$route.query.id;
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

    getImageUrl(url) {
      // console.log(url);
      if (url) {
        return API.IMAGE_URL + url;
      }
    },
  },
  mounted() {
    this.getTable();
    this.form.id = this.$route.query.id;
  },
};
</script>

<style scoped>
.el-input__inner {
  height: 56px !important;
}
.tableBody {
  width: 1400px;
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
