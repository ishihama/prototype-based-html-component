const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "public"),
    open: true,
    proxy: {
      "/api/*": {
        target: "http://jsonplaceholder.typicode.com/",
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    }
  }
};
