<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" icon="plus" @click="showCreate" v-if="hasPerm('article:add')">添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        align="center"
        prop="id"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="书名"
        style="width: 80px;">
      </el-table-column>
      <el-table-column
        prop="author"
        align="center"
        label="作者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="publishDate"
        align="center"
        label="发布日期"
        width="240">
      </el-table-column>

      <el-table-column
        prop="bookType"
        label="图书类别"
        align="center"
        width="120">
      </el-table-column>

      <el-table-column
        prop="bookCount"
        align="center"
        label="图书统计"
        width="120">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">

          <el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>
          <el-button @click="deleteBook(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="listQuery.pageSize"
      @current-change="page"
      :total="total">
    </el-pagination>
    <el-dialog title="新增图书" center width="30%" :visible.sync="addDialog">
      <el-form :model="form"   ref="form" label-width="80px">

        <el-form-item label="图书名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>

        <el-form-item label="出版社" prop="publish">
          <el-input v-model="form.publish"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="publishDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.publishDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="图书类型" prop="bookType">
          <el-input v-model="form.bookType"></el-input>
        </el-form-item>
        <el-form-item label="总页数" prop="pages">
          <el-input v-model="form.pages"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改图书" center width="30%" :visible.sync="editDialog">
      <el-form :model="updateForm"   ref="updateForm" label-width="80px">

        <el-form-item label="图书名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="updateForm.author"></el-input>
        </el-form-item>

        <el-form-item label="出版社" prop="publish">
          <el-input v-model="updateForm.publish"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="publishDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="updateForm.publishDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="图书类型" prop="bookType">
          <el-input v-model="updateForm.bookType"></el-input>
        </el-form-item>
        <el-form-item label="总页数" prop="pages">
          <el-input v-model="updateForm.pages"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {


        tableData: [],
        total:10,
        addDialog:false,
        formLabelWidth:'120px',
        editDialog:false,
        listQuery:{
          pageSize: 5,
          pageNum: 1, 
        },
        form:{
          name:'',
          author:'',
          publishDate:'',
          pages:'',
          publish:'',
          bookType:''
        },

        updateForm:{
          name:'',
          author:'',
          publishDate:'',
          pages:'',
          publish:'',
          bookType:''
        },
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
      
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建文章'
        },
        tempArticle: {
          id: "",
          content: ""
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        const _this = this;
        //查询列表
        if (!this.hasPerm('article:list')) {
          return
        }
        _this.listLoading = true;

        _this.api({
            url: "/book/findAll",
            method: "get",
            params: _this.listQuery
          }).then(data => {
            debugger;
            console.log(data);
            _this.listLoading = false;
            
            _this.tableData = data.datalist;
            _this.listQuery.pageSize = data.pageSize;
            _this.total = data.totalCount;
            
          })
      },
      page(data){
        const _this = this;
        _this.listQuery.pageNum = data;
        _this.api({
          url: "/book/findAll",
          method: "get",
          params: _this.listQuery
        }).then(data => {
          console.log(data);
          _this.tableData = data.datalist;
          _this.listQuery.pageSize = data.pageSize;
          _this.total = data.totalCount;
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        //显示新增对话框
        this.tempArticle.content = "";
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      showUpdate($index) {
        //显示修改对话框
        this.tempArticle.id = this.list[$index].id;
        this.tempArticle.content = this.list[$index].content;
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },
      createArticle() {
        //保存新文章
        this.api({
          url: "/article/addArticle",
          method: "post",
          data: this.tempArticle
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
      updateArticle() {
        //修改文章
        this.api({
          url: "/article/updateArticle",
          method: "post",
          data: this.tempArticle
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
    }
  }
</script>
