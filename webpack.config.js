'use strict';
var webpack = require("webpack");
const path = require('path');
module.exports = {  
  entry: [
    "./vendor.js",
    "./assets/css/_main.scss",
    "./index.js"
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },  
  devtool: 'source-map',
  resolve: {
    extensions:  ['.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      jquery: "jquery"
    })
  ],
  module: {
    rules: [
      { test: /\.ts$/, use: 'awesome-typescript-loader' },
      { test: /\.html/, use: 'raw-loader' },
      { test: /\.css$/, use: "style-loader!css-loader" },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './assets/**/*.scss',
            },
          },
        ],
      },
      { test: /bootstrap\/dist\/js\/umd\//, use: 'imports?jQuery=jquery' },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=res/[name].[ext]?[hash]'
      },
    ]
  },
  devServer: {
      proxy: [{
          path: '/api/**',
          target: 'http://127.0.0.1:7500'
      }]
  }  
}
