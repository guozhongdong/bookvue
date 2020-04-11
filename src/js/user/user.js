
export default {
  data(){
    return {
      pageSize:10,
      pageNum:1,
      total:10,
      tableData: [],

      addDialog:false,
      formLabelWidth:'120px',
      editDialog:false,
      roles: [],
      textMap: {
        update: '编辑',
        create: '新建用户'
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      tempUser: {
        username: '',
        password: '',
        nickname: '',
        roleId: '',
        userId: ''
      }
    }
  },
  created(){
    const _this = this;
    _this.axios.get('http://localhost:8182/user/findAll/'+_this.pageNum+'/'+_this.pageSize+'').then(function (resp) {
      console.log(resp)
      if (resp.data.success) {
        _this.tableData = resp.data.pageObjectList;
        _this.pageSize = resp.data.pageSize;
        _this.pageNum = resp.data.pageNo;
        _this.total = resp.data.total;
      }

    })
  },
  methods:{
    // 查询所有权限
    getAllRoles() {
      const _this = this;
      _this.axios.get('http://localhost:8182//user/getAllRoles').then(function (resp) {
        console.log(resp)
        if (resp.data.success) {
          _this.roles = resp.data.result;
          console.log(_this.roles)
        }

      })
    },
    showCreate() {
      //显示新增对话框
      this.tempUser.username = "";
      this.tempUser.password = "";
      this.tempUser.nickname = "";
      this.tempUser.roleId = "";
      this.tempUser.userId = "";
      this.dialogStatus = "create";
      this.getAllRoles();
      console.log(this.roles);
      this.dialogFormVisible = true
    },
    handleClick(row) {
      console.log(row);
    },
    getIndex($index) {
      //表格序号
      return $index + 1
    },
    cancelDialog (){
      const _this = this;
      _this.addDialog = false;
      _this.editDialog = false;
    },

    handleSizeChange(val) {
      //改变每页数量
      this.pageSize = val
      this.page(1);
    },
    handleCurrentChange(val) {
      //改变页码
      this.pageNum = val
      this.page(val);
    },
    createUser() {
      //添加新用
      const _this = this;
      _this.axios.post('http://localhost:8182//user/addUser',_this.tempUser).then(function (resp) {
        console.log(resp)
        if (resp.data.success) {
          _this.$message({
            message: '恭喜你，添加用户成功',
            type: 'success'
          });
          _this.page(1);
          _this.dialogFormVisible = false
        }

      })
    },

    page(data){
      const _this = this;
      _this.axios.get('http://localhost:8182/user/findAll/'+data+'/'+_this.pageSize+'').then(function (resp) {
        if (resp.data.success) {
          _this.tableData = resp.data.pageObjectList;
          _this.pageSize = resp.data.pageSize;
          _this.pageNum = resp.data.pageNo;
          _this.total = resp.data.total;
        }
      })

    }
  }
}
