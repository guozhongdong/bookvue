
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
      roles: []
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
          _this.roles = resp.data.pageObjectList;
        }

      })
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
    deleteBook (id){
      const _this = this;

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
