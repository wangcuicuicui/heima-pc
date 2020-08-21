<template>
  <div class="my-cover">
    <div class="operateBox"
         v-for="(item,index) in picnum"
         :key="item"
         @click="openDialog(index)">
      <span v-show="spanShow[index]">选择素材</span>
      <img class="img" :src="images[index]" alt="">
    </div>
    <!-- 对话框 -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <el-card class="box-card">
        <div style="padding-bottom: 20px;">
          <el-radio-group v-model="collect" size="mini" @change="collectChange">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 素材列表 -->
        <el-row :gutter="10">
          <el-col class="img_item" :xs="12" :sm="6" :md="6" :lg="4"
                  v-for="(item,index) in imageList"
                  :key="item.id"
                  @click.native="isShow(item)">
            <div class="img_box">
              <img :src="item.url" alt="">
              <div class="selected" v-show="item.isShow">
                <img src="./img/selected.png" alt="">
              </div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import { getImages } from '../../api/images'

  export default {
    props: {
      picnum: {
        type: Number
      },
      fImages: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        collect: false,
        imageList: [],
        total_count: 0,
        pageSize: 12,
        dialogVisible: false,
        curIndex: 0,
        curImage: null,
        images: this.fImages.length > 0 ? this.fImages : new Array(this.picnum),// 缓存选中的图片
        spanShow: [true, true, true]
      }
    },
    methods: {
      openDialog (index) {
        this.dialogVisible = true
        // 缓存当前点击的第几项
        this.curIndex = index
        console.log('当前点击的是第' + this.curIndex)
      },
      // 分页
      pageChang (val) {
        this.hGetImages(val)
      },
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
      // 每页现实的条数
      sizeChange (val) {
        this.pageSize = val
        this.hGetImages()
      },
      // 全部收藏
      collectChange () {
        this.hGetImages()
      },
      cancel () {
      },

      isShow (item) {
        this.imageList.forEach(item => {
          item.isShow = false
        })
        item.isShow = true
        //  将选中的图片缓存下来
        this.curImage = item
      },
      confirm () {
        //  先拿到当前的选中图片
        //  将拿到的图片添加到images
        //  images[index] = curimage
        this.images[this.curIndex] = this.curImage.url
        this.dialogVisible = false
        if (this.images[this.curIndex]) {
          this.spanShow[this.curIndex] = false
        }
      },
      sendSelected () {
        return this.images
      }
    },
    mounted () {
      this.hGetImages()
      if (this.images[this.curIndex]) {
        this.spanShow[this.curIndex] = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .operateBox {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 13px;
    color: #666;
    text-align: center;
    line-height: 100px;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .img_item {
    position: relative;
    box-sizing: border-box;

    .img_box {
      height: 120px;
      margin-bottom: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .selected {
        position: absolute;
        width: 20%;
        left: 0;
        top: 0;
      }
    }
  }

  .option {
    position: absolute;
    left: 5px;
    right: 5px;
    bottom: 5px;
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

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .uploadBox {
    text-align: center;

    img {
      width: 100%;
    }

    // scoped代表当前的样式只能影响当前的组件  影响不了子组件的样式
    // 加上 /deep/ 之后可以进行深度样式控制
    // 当试图直接控制子组件内部元素样式的时候就需要添加 /deep/
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
</style>

