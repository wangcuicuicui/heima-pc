<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
<!--      表单项-->
            <el-form class="login-form">
<!--              表单子项-->
              <el-form-item>
                <el-input
                  placeholder="请输入手机号"
                  v-model="from.mobile"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  placeholder="请输入验证码"
                  v-model="from.code"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="from.checkFlag">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login-btn"
                  type="primary"
                  @click="doLogin"
                  :loading="loadingFlag"
                >登录</el-button>
              </el-form-item>
            </el-form>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      from: {
        mobile: '13911111111',
        code: '246810',
        // 只有一个、的时候是布尔值
        // 多个的时候是数组形式
        checkFlag: false
      },
      loadingFlag: false
    }
  },
  methods: {
    doLogin () {
      // 判断是否同意协议
      if (this.from.checkFlag === false) {
        this.$message({
          message: '请先同意用户协议和隐私条款',
          type: 'warning'
        })
        return
      }
      // 登录显示加载
      this.loadingFlag = true
      // 获取请求
      request({
        url: '/mp/v1_0/authorizations',
        method: 'POST',
        data: {
          mobile: this.from.mobile,
          code: this.from.code
        }
      }).then(res => {
        // 前求成功显示提示
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
        // 加载状态关闭
        this.loadingFlag = false
      })
    }
  }
}
</script>

<style lang="less">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./imges/login_bg.jpg") no-repeat;
    background-size: cover;

    .login-form-wrap {
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;

      .login-head {
        display: flex;
        justify-content: center;

        .logo {
          width: 200px;
          height: 57px;
          background: url("./imges/logo_index.png") no-repeat;
          background-size: contain;
        }
      }

      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
