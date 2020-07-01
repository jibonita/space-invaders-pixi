const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/Main.js",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/dist/",
    contentBase: path.join(__dirname),
    watchContentBase: true,
    compress: true,
    watchOptions: {
      poll: true,
    },
  },
  plugins: [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
