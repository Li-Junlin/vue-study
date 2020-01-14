module.exports = {
  devServer: {
    port: 9060, // 端口号，如果端口被占用，会自动提升 1
    open: false, // 启动服务自动打开浏览器
    https: false, // 是否开启HTTPS协议
    host: "localhost", // 主机名，也可以是 127.0.0.1 或 （手机端）做真机测试的时候 0.0.0.0
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // 目标服务器地址
        // target: "http://127.0.0.1:9061",
        target: process.env.VUE_APP_SERVICE_URL,
        changeOringin: true, // 开启服务转发
        pathRewrite: {
          // 将 请求地址前缀 /dev-api 替换为空的
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },

  lintOnSave: false, // 默认 true， 警告仅仅会被输出命令行，且不会使得编译失败。
  outputDir: "dist", // 默认是 dist， 存放打包文件的目录。
  assetsDir: "assets", // 存放生成的静态资源（js、css、img、fonts）的（相对于 outputDir）目录
  indexPath: "out/index.html", // 默认 index.html, 指定生成的 index.html 的输出路径（相对于 outputDir）
  productionSourceMap: false // 打包时不会生成 .map 文件。加快打包速度
  // filenamehashing: false // 打包时，静态文件不会生成hash值
};
