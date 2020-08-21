<template>
  <el-container class="layout-container">
    <!--    侧边栏-->
    <el-aside
      :width="isCollapse?'64px':'200px'"
      class="aside">
      <div :class="{minLogo:isCollapse}" class="logo"></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        active-text-color="#ffd04b"
        background-color="#002033"
        class="nav-menu"
        default-active="2"
        text-color="#fff">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材列表</span>
        </el-menu-item>
        <el-menu-item index="/addArticle">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发表文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-user"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!--      头部-->
      <el-header class="header">
        <div @click="hSwitch">
          <i :class="isCollapse? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          <span>黑马程序员</span>
        </div>
        <el-dropdown>
          <!-- 默认插槽：用来显示触发开关 -->
          <div class="avatar-wrap">
            <img :src="userInfo.photo"
                 alt=""
                 class="avatar">
            <span>{{userInfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!--具名插槽：用来显示下拉内容 -->
          <el-dropdown-menu slot="dropdown">
            <!--            事件修饰符.native 事件绑定无效的时候尝试添加-->
            <el-dropdown-item @click.native="goSetting">设置</el-dropdown-item>
            <el-dropdown-item @click.native="goLogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!--      主题-->
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { userGet } from '../../api/user'
import { clearUserInfo } from '../../store'

export default {
  data () {
    return {
      // 侧边栏 为true的时候是收起状态
      isCollapse: false,
      userInfo: {}
    }
  },
  methods: {
    hSwitch () {
      this.isCollapse = !this.isCollapse
    },
    hGetUserInfo () {
      userGet().then(res => {
        this.userInfo = res.data.data
      })
    },
    goSetting () {
      if (this.$route.path === '/setting') {
        return
      }
      this.$router.push({
        path: '/setting'
      })
    },
    goLogin () {
      //  先进行询问
      this.$confirm('此操作将会退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        clearUserInfo()
        this.$router.push({
          path: '/login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.hGetUserInfo()
    //  进行name接值
    this.eventBus.$on('getUserName', (name) => {
      //  payLoad表示将来要传递的name值
      this.userInfo.name = name
    })
    //  进行图片接值
    this.eventBus.$on('getUserPhoto', (url) => {
      //  payLoad表示将来要传递的name值
      this.userInfo.photo = url
    })
  }
}
</script>

<style lang="less" scoped>
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .aside {
    background-color: #002033;

    .el-menu {
      border-right: none;
    }

    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(./img/logo_admin.png) no-repeat center / 140px auto;
    }

    // 覆盖background 的图片和大小，类书写在logo的下方。
    .minLogo {
      background-image: url(./img/logo_admin_01.png);
      background-size: 36px auto;
    }
  }

  .nav-menu {
    .iconfont {
      margin-right: 10px;
      padding-left: 5px;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .avatar-wrap {
      display: flex;
      align-items: center;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .main {
    background-color: #e9eef3;
  }
</style>
