
<template id="book">
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="addBook">新增</el-button>
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
        width="120">
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
      :page-size="pageSize"
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
<script src="../js/bookmanage/bookmanage.js"></script>
