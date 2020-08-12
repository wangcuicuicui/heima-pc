<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
<!--      表单项-->
            <el-form class="login-form" :model="from" :rules="fromRules" ref="myFrom">
<!--              表单子项-->
              <el-form-item prop="mobile">
                <el-input
                  placeholder="请输入手机号"
                  v-model="from.mobile"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  placeholder="请输入验证码"
                  v-model="from.code"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkFlag">
                <el-checkbox v-model="from.checkFlag">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login-btn"
                  type="primary"
                  @click="doValidate"
                  :loading="loadingFlag"
                >登录</el-button>
              </el-form-item>
            </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user'
export default {
  data () {
    // 1. 定义校验函数
    // value表示表单元素中当前的值
    // callback表示进行校验之后要执行的回调函数
    // 最终校验成功之后的callback一定要执行到！！！！
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      }
      callback()
    }
    const validateCheck = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请先同意协议'))
      }
      callback()
    }
    return {
      from: {
        mobile: '',
        code: '',
        // 只有一个、的时候是布尔值
        // 多个的时候是数组形式
        checkFlag: false
      },
      loadingFlag: false,
      fromRules: {
        mobile: [
          // required非空校验
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        code: [
          // validator固定写法组件库固定的
          { validator: validatePass, trigger: 'blur' }
        ],
        checkFlag: [
          { validator: validateCheck, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    doValidate () {
      this.$refs.myFrom.validate((valid) => {
        if (valid) {
          // 执行通过的逻辑
          this.doLogin()
        } else {
          // 执行未通过的逻辑
          return false
        }
      })
    },
    doLogin () {
      // 登录显示加载
      this.loadingFlag = true
      // 获取请求
      login(this.from.mobile, this.from.code).then(res => {
        // 加载状态关闭
        this.loadingFlag = false
        // 前求成功显示提示
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
        // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '账号密码错误，请重新输入',
          type: 'error'
        })
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
