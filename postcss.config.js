module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":  {
      viewportWidth: 375,
      viewportHeight: 667,
      viewportUnit: "vw",
      unitPrecision: 5,  // 转换后的精确单位
      selectorBlackList: ["ignore", "tab-bar", "tab-bar-item"],  // 不转换的类
      minPixelValue: 1,  // 不转换的最小单位
      mediaQuery: false,  // 在媒体查询中是否转换
    }
  }
}