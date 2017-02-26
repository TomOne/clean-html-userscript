'use strict'

const path = require('path')
const webpack = require('webpack')
const UserscriptHeader = require('userscript-header')

const userscriptHeader = UserscriptHeader.fromPackage('./package.json').toString()

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: userscriptHeader,
      raw: true,
      entryOnly: true,
    }),
  ],
}
