const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const dotEnv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
  const env = dotEnv.config({
    path: path.join(__dirname, '/config/.env')
  }).parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  // Where files should be sent once they are bundled
  return {
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'index.bundle.js'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
      port: 8080
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /nodeModules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin(),
      new EsLintPlugin(),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
