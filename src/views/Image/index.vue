<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom: 20px;">
        <el-radio-group v-model="collect" size="mini" @change="collectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float: right" @click="showDdd">上传图片素材</el-button>

      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col class="img_item" :xs="12" :sm="6" :md="6" :lg="4"
                v-for="(item,index) in imageList"
                :key="item.id"
                @mouseenter.native="mEnter(item)"
                @mouseleave.native="mLeave(item)">
          <div class="img_box">
            <img :src="item.url" alt="">
          </div>
          <div class="option" v-show="item.isShow">
            <span class="el-icon-star-off" @click="hFavorite(item)"
                  :style="{color:item.is_collected ?'red':'#fff'}"></span>
            <span class="el-icon-delete" @click="hDelImages(item.id,index)"></span>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
      <el-pagination
        background
        layout="sizes, prev, pager, next"
        :total="total_count"
        class="pageCount"
        :page-sizes="[6, 12, 24, 30]"
        :page-size="12"
        @size-change="sizeChange"
        @current-change="pageChang">
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body>
      <span>
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          multiple
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { delImages, favorites, getImages } from '../../api/images'
import { getUserInfo } from '../../store'

export default {
  components: {},
  props: {},
  data () {
    return {
      collect: false,
      imageList: [],
      total_count: 0,
      pageSize: 12,
      dialogVisible: false,
      headers: { // 图片上传的token
        Authorization: `Bearer ${getUserInfo().token}`
      },
      imageUrl: null
    }
  },
  methods: {
    // 获取数据
    hGetImages (val) {
      getImages({
        page: val || 1,
        per_page: this.pageSize,
        collect: this.collect
      }).then(res => {
        // 给每一现数据中添加新的数据，来控制显示跟隐藏
        // 数据处理
        const list = res.data.data.results
        const newList = list.map((item) => {
          return {
            ...item,
            isShow: false
          }
        })
        this.imageList = newList
        this.total_count = res.data.data.total_count
      })
    },
    // 分页
    pageChang (val) {
      this.hGetImages(val)
    },
    // 每页现实的条数
    sizeChange (val) {
      this.pageSize = val
      this.hGetImages()
    },
    // 全部收藏
    collectChange () {
      this.hGetImages()
    },
    // 移入
    mEnter (item) {
      item.isShow = true
    },
    // 移出
    mLeave (item) {
      item.isShow = false
    },
    //  收藏和取消收藏
    hFavorite (item) {
      const { id,  is_collected } = item
      favorites(id, !is_collected).then(res => {
        item.is_collected = !is_collected
      })
    },
    // 删除
    hDelImages (id, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delImages(id).then(res => {
          // this.hGetImages()
          // 删除之后更新本地数据
          this.imageList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 图片上传成功
    handleAvatarSuccess (response, file, fileList) {
      const url = response.data.url
      this.imageUrl = url
      console.log(response)
      this.hGetImages()
    },
    // 上传前做校验
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    showDdd () {
      this.imageUrl = null
      this.dialogVisible = true
    }

  },
  // 生命周期钩子
  mounted () {
    this.hGetImages()
    console.log(this.imageList)
  }
}
</script>

<style lang="less" scoped>
  .img_item {
    position: relative;
    box-sizing: border-box;

    .img_box {
      height: 180px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .option {
    position: absolute;
    left: 5px;
    right: 5px;
    bottom: 0px;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    display: flex;

    span {
      flex: 1;
      text-align: center;
      cursor: pointer;
      line-height: 30px;
    }
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

  .avatar-uploader {
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }

  .pageCount {
    margin-top: 15px;
    text-align: center;
  }
  .avatar-uploader{
    img{
      width: 100%;
    }
  }
</style>
