module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['better-sqlite3'],
      nodeIntegration: true
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
