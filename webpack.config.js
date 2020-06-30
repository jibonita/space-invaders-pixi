const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/Main.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname),
    watchContentBase: true,
    watchOptions: {
      poll: true,
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new HtmlWebpackPlugin({
    //   title: "Output Management",
    // }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
};
