<template>
  <div class="publish-container">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="articleForm" :rules="rules" :model="article" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <quill-editor v-model="article.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <!-- 根据后端接口约定 -->
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="coverBox" v-if="article.cover.type > 0">
          <Cover :picnum="article.cover.type" :key="article.cover.type" ref="cover"></Cover>
        </div>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="channel in channels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hAddArticle(false)">发表</el-button>
          <el-button @click="hAddArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { addArtice, getChannels } from '../../api/article'
  import Cover from './Cover'
  export default {
    components: { quillEditor, Cover },
    data: function () {
      return {
        // 富文本编辑器的配置项
        editorOption: {
          placeholder: '',//占位文字
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              ['image']
            ]
          }
        },
        channels: [],
        article: {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面图片的张数
            images: [], // 封面的地址
          },
          channel_id: '', // 频道id
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在5到30之间', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入文章内容', trigger: 'blur' },
            { min: 20, max: 30000, message: '最少20个字', trigger: 'blur' }
          ],
          channel_id: [
            { required: true, message: '请选择文章频道', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 获取频道数据
      hGetChannels () {
        getChannels().then(res => {
          this.channels = res.data.data.channels
        })
      },
      // 发布文章
      hAddArticle (isDraft) {
        // 调用Cover组件的方法
        // 先校验字段
        this.$refs['articleForm'].validate((valid) => {
          if (valid) {
            if(this.article.cover.type>0){
              let images = this.$refs.cover.sendSelected()
              this.article.cover.images = images
            }
            addArtice(isDraft, this.article).then(res => {
                this.$message({
                  type: 'success',
                  message: '文章发布成功'
                })
                this.article = {
                  title: '', // 文章标题
                  content: '', // 文章内容
                  cover: {
                    type: 0, // 封面图片的张数
                    images: [], // 封面的地址
                  },
                  channel_id: '', // 频道id
                }
              }
            )
          } else {
            return false;
          }
        })
      }
    },
    mounted () {
      this.hGetChannels()
    }
  }
</script>

<style lang="less" scoped>
.coverBox {
  padding-left: 70px;
  margin-bottom: 20px;
}
</style>
