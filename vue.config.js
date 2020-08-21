module.exports = {
  // 保存时关闭效验
  lintOnSave: false,
  // 配置打包的路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/'
}
