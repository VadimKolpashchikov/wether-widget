const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  devtool: "source-map",
  output: {
    filename: "weather-widget.min.js",
    path: path.resolve(__dirname, "./build/"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./build"),
    },
    open: true,
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".scss", ".ts"],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: "vue-style-loader!css-loader!sass-loader",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "vue-style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(ts|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
