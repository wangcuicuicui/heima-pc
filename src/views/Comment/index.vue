<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      :data="commentData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        label="评论状态">
        <template slot-scope="scope">
          <span v-if="scope.row.comment_status">打开</span>
          <span v-if="!scope.row.comment_status">关闭</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!--          评论状态是打开的时候显示关闭评论按钮   关闭的时候显示开启评论按钮-->
          <el-button v-if="scope.row.comment_status" type="danger" @click="commentsOff(scope.row)">关闭评论</el-button>
          <el-button v-if="!scope.row.comment_status" type="success" @click="commentsOpan(scope.row)">开启评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total_count"
      class="pageCount"
      @current-change="pageChange">
    </el-pagination>
  </el-card>

</template>

<script>

import { getComments, offComments } from '../../api/comment'

export default {
  data () {
    return {
      commentData: [],
      data: 1,
      total_count: 0
    }
  },
  methods: {
    // 获取数据
    hGetList (val) {
      getComments({ page: val || 1, response_type: 'comment' }).then(res => {
        console.log(res)
        // 把获取的数据传递给本地
        this.commentData = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    // 关闭评论
    commentsOff (row) {
      const id = row.id.toString()
      offComments(id, !row.comment_status).then(() => {
        // 将只改变，页面动态更改
        row.comment_status = !row.comment_status
      })
    },
    // 开启评论
    commentsOpan (row) {
      const id = row.id.toString()
      offComments(id, !row.comment_status).then(() => {
        row.comment_status = !row.comment_status
      })
    },
    // 获取分页跳转
    pageChange (val) {
      this.hGetList(val)
    }
  },
  mounted () {
    this.hGetList()
  }
}
</script>

<style lang="less" scoped>
  .pageCount {
    margin-top: 15px;
    text-align: center;
  }
</style>
