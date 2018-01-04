var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // for now we set one entry for the main package.json entry
  entry: {
    app: ['./src/index.js']
  },

  output: {
    path: path.resolve('./build'),
    filename: 'assets/[name].min.js'
  },

  // resolve files
  // we reference a bunch of files in the build tool
  // command dir is the project path
  resolve: {
    extensions: ['.js', '.css'],
    modules: ['./node_modules']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/syr')
        ],
        query: {
          presets: ['env'],
          plugins: [
            [
              path.resolve('./node_modules/syr/libs/jsx.js'),
              { useVariables: true }
            ]
          ]
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      appMountId: 'app',
      title: 'Native Checkout',
      mobile: true,
      template: require('html-webpack-template'),
      links: []
    })
  ]
};
