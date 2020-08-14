<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header">已为您筛选{{total_count}}条数据</div>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label="封面">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0">草稿</el-tag>
              <el-tag v-else-if="scope.row.status===1" type="info">待审核</el-tag>
              <el-tag v-else-if="scope.row.status===2" type="success">审核通过</el-tag>
              <el-tag v-else-if="scope.row.status===3" type="warning">审核失败</el-tag>
              <el-tag v-else-if="scope.row.status===4" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="total_count"
          class="pageCount"
          @current-change="pageChange">
        </el-pagination>
      </template>
    </el-card>
  </div>

</template>

<script>
import { getList } from '../../api/article'

export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [],
      total_count: 0// 当前条件下获取的文章总数
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    hGetList (val) {
      getList({ page: val || 1 }).then(res => {
        this.tableData = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    pageChange (val) {
      this.hGetList(val)
    },
    handleEdit (index, row) {
      this.$router.push({
        path: '/editArticle',
        query: {
          id: row.id
        }
      })
    },
    handleDelete () {

    }
  },
  mounted () {
    this.hGetList()
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    margin-top: 20px;
  }

  .pageCount {
    margin-top: 15px;
  }
</style>
