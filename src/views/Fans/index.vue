<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total_count"
            class="pageCount"
            @current-change="pageChange">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="img">
          <!--          ECharts 准备一个具备高宽的 DOM 容器-->
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { getFans, getFansStatistics } from '../../api/fans'
  export default {
    data () {
      return {
        // tabs的当前激活选项卡的name属性值
        activeName: 'list',
        total_count: null,
        fansList: [],
        // 测试头像
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
    methods: {
      hGetFans (val) {
        getFans({ page: val || 1 }).then(res => {
          console.log(res)
          this.fansList = res.data.data.results
          this.total_count = res.data.data.total_count
        })
      },
      pageChange (val) {
        this.hGetFans(val)
      },
      hGetFansStatistics () {
        getFansStatistics().then(res=>{
          this.initCharts(res.data.data.age)
        })
      },
      initCharts (ageObj) {
        // 将接口返回的对象形式的数据转化为数组形式
        let x =[]
        let y = []
        Object.keys(ageObj).forEach(key=>{
          x.push(key.replace('le18','0～18')
            .replace('le23','19～23')
            .replace('le30','24～30')
            .replace('le40','31～40')
            .replace('le50','41～50').
            replace('gt50','50+'))
          y.push(ageObj[key])
        })
        let myChart = echarts.init(this.$refs.main)
        let option = {
          tooltip: {},
          // legend: {},
          xAxis: {
            type: "category",
            data: x
          },
          yAxis: {},
          series: [{
            name: '数量',
            type: 'bar',
            data: y
          }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      }
    },
    mounted () {
      this.hGetFans()
      this.hGetFansStatistics()
    }
  }
</script>

<style scoped lang='less'>
  .fans_list {
    .fans_item {
      width: 120px;
      height: 170px;
      border: 1px dashed #ddd;
      text-align: center;
      padding-top: 10px;
      display: inline-block;
      margin-right: 30px;
      margin-bottom: 30px;

      p {
        margin: 10px 0;
      }
    }
  }
</style>

