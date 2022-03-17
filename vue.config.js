module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['better-sqlite3'],
      nodeIntegration: true,
      builderOptions: {
        extraResources: {
          // 拷贝dll等静态文件到指定位置,否则打包之后回出现找不大dll的问题
          from: './app_file/',
          to: './app_file/'
        }
        // build: {
        //   extraResources: ['./dev_tools/**']
        // }
        // options placed here will be merged with default configuration and passed to electron-builder
      }
    }
  },
  css: {
    sourceMap: true,
    // global sass style
    loaderOptions: {
      // pass option to sass-loader
      sass: {
        prependData: '@import "./src/assets/css/global.scss";'
      }
    }
  },
  configureWebpack: {
    /**
     * Because our component's name is like `componentName/index.vue`.
     * So when we print somthing to console(such as log),
     * the path of component on the right side might be wrong.
     * That's why I add this option.
     */
    devtool: 'source-map'
  }
}
