<template>
  <div class='setting-container'>
    <el-card>
      <!-- 导航 -->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateUser" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性-->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadPhoto"
            :show-file-list="false">
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { userGet } from '../../api/user'
  import { userPhoto, userProfile } from '../../api/setting'

  export default {
    name: 'my-setting',
    data () {
      return {
        // 用户信息
        userInfo: {
          name: 'test',
          intro: 'info',
          email: 'info@qq.com',
          mobile: '',
          id: '',
          photo:''
        },
        // 支持上传组件的数据
        imageUrl: null
      }
    },
    methods: {
      hGetUserProfile () {
        userGet().then(res=>{
          console.log(res)
          this.userInfo = res.data.data
        })
      },
      updateUser () {
        let {name,intro,email} = this.userInfo
        userProfile(name,intro,email).then(res => {
          this.hGetUserProfile()
          //  进行name传值
          this.eventBus.$emit('getUserName',name)
        })
      },
      uploadPhoto (res) {
      //  res包含上传文件方法的对象
      //  使用组件  会自动将上传模式转换为formdata格式
      //  自定义转换formdata类型转换
        let { file } = res
        let formData = new FormData()
        formData.append('photo',file)
        userPhoto(formData).then(res=>{
          this.userInfo.photo = res.data.data.photo
          //  进行图片传值
          this.eventBus.$emit('getUserPhoto', this.userInfo.photo)
        })
      }
    },
    mounted () {
      this.hGetUserProfile()

    }
  }
</script>

<style scoped lang='less'>
  .avatar{
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .edit-photo{
    font-size: 12px;
    text-align: center;
  }
</style>

