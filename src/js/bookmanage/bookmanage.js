
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
    _this.axios.get('http://localhost:8182/book/findAll/'+_this.pageNum+'/5').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data.content;
      _this.pageSize = resp.data.size;
      _this.total = resp.data.totalElement;
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
      _this.updateForm.name = row.name;
      _this.updateForm.author = row.author;
      _this.updateForm.publishDate = row.publishDate;
      _this.updateForm.pages = row.pages;
      _this.updateForm.publish = row.publish;
      _this.updateForm.bookType = row.bookType;
    },

    edit (){
      const _this = this;
      console.log(_this.form);
      _this.axios.post('http://localhost:8182/book/update',_this.updateForm).then(function (resp) {
        if (resp.data === 1){
          //_this.message.success('新增成功');
          _this.editDialog = false;
        }
        console.log(resp);
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
      _this.axios.post('http://localhost:8182/book/save',_this.form).then(function (resp) {
        if (resp.data === 1){
          //_this.message.success('新增成功');
          _this.addDialog = false;
        }
        console.log(resp);
      })
    },
    deleteBook (id){
      const _this = this;
      console.log(id);
    },

    page(data){
      const _this = this;
      _this.axios.get('http://localhost:8182/book/findAll/0/6').then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.content;
        _this.pageSize = resp.data.size;
        _this.total = resp.data.totalElements;
      })

    }
  }
}
