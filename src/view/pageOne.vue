
<template>
  <div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="120">
    </el-table-column>
    <el-table-column

      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      @current-change="page"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      page(data){
        const _this = this;
        _this.axios.get('http://localhost:8182/book/findAll/'+(data-1)+'/6').then(function (resp) {
          console.log(resp)
          _this.tableData = resp.data.content;
          _this.pageSize = resp.data.size;
          _this.total = resp.data.totalElements;
        })

      }
    },

    data() {
      return {
        pageSize:10,
        pageNum:1,
        total:10,
        tableData: []
      }
    },
    created(){
      const _this = this;
      _this.axios.get('http://localhost:8182/book/findAll/6').then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.content;
        _this.pageSize = resp.data.size;
        _this.total = resp.data.totalElements;
      })
    }
  }
</script>
