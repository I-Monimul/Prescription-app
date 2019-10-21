const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");


let K_ENV = 'dev';
const K_ENV_DEV = 'dev';
const K_ENV_TEST = 'test';
const K_ENV_PROD = 'prod';
if (process.env.K_ENV) {
  K_ENV = process.env.K_ENV;
}

module.exports = {
  mode: 'development',
  context: path.join(__dirname),
  entry: [
    './src/main.webpack.js'
  ],
  resolve: {
    extensions: ['.js', '.html']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'svelte-loader',
          query: {
            dev: true,
            hotReload: true,
            emitCss: false,
            store: true
          }
        },
        {
          loader: StringReplacePlugin.replace({
            replacements: [{
              pattern: /_COMPONENT_/g,
              replacement: function () {
                var id = this.resourcePath,
                  parts = id.split(path.sep);
                return parts.pop().split('.').shift();
              }
            }, {
              pattern: /_FILE_/g,
              replacement: function () {
                var id = this.resourcePath,
                  parts = id.split(path.sep);
                return parts.pop();
              }
            }]
          })
        }]
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              url: false
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      K_ENV: JSON.stringify(K_ENV),
      K_ENV_DEV: JSON.stringify(K_ENV_DEV),
      K_ENV_TEST: JSON.stringify(K_ENV_TEST),
      K_ENV_PROD: JSON.stringify(K_ENV_PROD)
    }),
    new StringReplacePlugin(),
    new MiniCssExtractPlugin({
      filename: "css/global.css"
    })
  ].filter(Boolean),
  devServer: {
    contentBase: './public',
    port: 9001,
    host: '0.0.0.0',
    hotOnly: true
  },
  devtool: 'inline-source-map'
};