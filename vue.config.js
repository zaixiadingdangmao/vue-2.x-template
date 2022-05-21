/*
 * @Description: vue 配置文件
 * @Author: zhangxuelong
 * @Date: 2022-04-18 09:23:49
 */
module.exports = {
  pages: {
    index: {
      title: '项目模板',
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    port: 8080,
    https: false,
    open: true
  },
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/index.scss";`
      }
    }
  }
};
