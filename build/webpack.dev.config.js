const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: 'Gutils.js',
    path: path.resolve(__dirname, '..', 'dist'),
    library: "Gutils",
    libraryTarget: "umd",
    auxiliaryComment: {
        root: "Root Comment",
        commonjs: "CommonJS Comment",
        commonjs2: "CommonJS2 Comment",
        amd: "AMD Comment"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  },
  devServer: {
    publicPath: "/",
    port: 8086,
    open: true,
    hot: true,
    inline: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};
