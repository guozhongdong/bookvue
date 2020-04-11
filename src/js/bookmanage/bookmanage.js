
export default {
  data(){
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
    }
  },
  created(){
    const _this = this;

    _this.api({
      url: "/book/findAll",
      method: "get",
      params: _this.listQuery
    }).then(data => {
      console.log(data);
      if (data.success) {
        _this.tableData = data.pageObjectList;
        _this.listQuery.pageSize = data.pageSize;
        _this.total = data.total;
      }
    })
  },
  methods:{
    handleClick(row) {
      console.log(row);
    },
    addBook (){
      const _this = this;
      _this.addDialog = true;
    },

    editData (row){
      const _this = this;
      _this.editDialog = true;
      _this.updateForm.id = row.id;
      _this.updateForm.name = row.name;
      _this.updateForm.author = row.author;
      _this.updateForm.publishDate = row.publishDate;
      _this.updateForm.pages = row.pages;
      _this.updateForm.publish = row.publish;
      _this.updateForm.bookType = row.bookType;
    },

    edit (){
      const _this = this;
      //var queryParam = JSON.stringify(_this.updateForm);
      _this.api({
        url: "/book/update",
        method: "post",
        data: _this.updateForm
      }).then(data => {
        console.log(data);
        if (data.success) {
          _this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          });
          _this. page(1);
          _this.editDialog = false;
        }
      })
    },
    cancelDialog (){
      const _this = this;
      _this.addDialog = false;
      _this.editDialog = false;
    },
    add (){
      const _this = this;
      console.log(_this.form);

      _this.api({
        url: "/book/save",
        method: "post",
        data: _this.form
      }).then(data => {
        if (data.success) {
          _this.$message({
            message: '恭喜你，新增成功',
            type: 'success'
          });
          _this. page(1);
          _this.addDialog = false;
        }
      })
    
    },
    deleteBook (id){
      const _this = this;

      _this.api({
        url: "/book/deleteById",
        method: "get",
        params: {id:id}
      }).then(data => {
        if (data.success) {
          _this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          });
          _this. page(1);
        }
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
        if (data.success) {
          _this.tableData = data.pageObjectList;
          _this.listQuery.pageSize = data.pageSize;
          _this.total = data.total;
        }
      })
    
    }
  }
}
