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
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channelId" placeholder="请选择频道">
            <!--            通过v-for渲染数据 绑定的只是value的值-->
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <!--          获取出组件时间的值是数组形式-->
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            value-format="yyyy-MM-dd">
            <!--            转换数据date时间的格式-->
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
import { delArticle, getChannels, getList } from '../../api/article'

export default {
  data () {
    return {
      form: {
        status: null, // 文章状态默认值
        channelId: null, // 文章频道默认值
        date: null, // 事件组件传递的值
        begin_pubdate: '', // 开始日期
        end_pubdate: '', // 结束日期
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [], // 文章列表的数据
      channels: [], // 文章频道的数据
      total_count: 0// 当前条件下获取的文章总数
    }
  },
  methods: {
    // 按状态查询
    onSubmit () {
      this.hGetList()
    },
    hGetList (val) {
      // 由于时间组件传递的值是数组形式，跟提交给后端的数据类型不一致
      // 将数值的值分别去出，然后一一赋值给后端需要的参数
      if (this.form.date === null) {
        this.form.begin_pubdate = ''
        this.form.end_pubdate = ''
      } else {
        this.form.begin_pubdate = this.form.date[0]
        this.form.end_pubdate = this.form.date[1]
      }
      getList({
        page: val || 1,
        status: this.form.status,
        channel_id: this.form.channelId,
        begin_pubdate: this.form.begin_pubdate,
        end_pubdate: this.form.end_pubdate
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    // 获取分页跳转
    pageChange (val) {
      this.hGetList(val)
    },
    // 编辑文章跳转
    // index -> scope.$index  从0开始代表当前操作的是数据的第几项
    // row -> scope.row    代表的数据list中的每一项 {}
    handleEdit (index, row) {
      this.$router.push({
        path: '/editArticle',
        query: {
          id: row.id
        }
      })
    },
    // 删除
    handleDelete (index, row) {
      // 将把JSONbig转换过的数据再次转换为字符串格式
      const id = row.id.toString()
      console.log(id)
      delArticle(id).then(res => {
        this.hGetList()
      })
    },
    //  获取文章频道
    hGetChannels () {
      getChannels().then(res => {
        this.channels = res.data.data.channels
      })
    }

  },
  mounted () {
    this.hGetList()
    this.hGetChannels()
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
