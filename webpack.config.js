const path = require("path");

module.exports = {
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
    open: true
  }
};
