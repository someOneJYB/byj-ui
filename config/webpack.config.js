const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dirname = process.cwd();
const fs = require('fs');

const readDir = fs.readdirSync('./src').slice(0, -1);
readDir.splice(readDir.indexOf('images'), 1);
readDir.splice(readDir.indexOf('index'), 1);
const resultFile = {};
readDir.map((item) => {
  resultFile[item] = `./src/${item}/index.js`;
});
resultFile.index = './src/index.js';
console.log(resultFile);
// fs.readdir('D:/Movie/www', function (err, files) {
//     if (err) {
//         return console.log('目录不存在')
//     }
//     console.log(files)
// })
const cssFilename = 'css/[name].css';
const cssChunkFilename = 'css/[name].css';
const jsFilename = 'js/[name].js';
const jsChunkFilename = 'js/[name].js';
module.exports = {
  // 打包模式，可选development和production
  'mode': 'production',
  // 配置入口文件
  'entry': {
    ...resultFile
  },
  // 配置输出文件
  'output': {
    // 输出路径
    'path': path.resolve(__dirname, '../lib/style'),
    // 输出文件名称
    'filename': jsFilename,
    'chunkFilename': jsChunkFilename,
    'publicPath': '/'
  },
  'externals': {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes'
  },
  // 模块，可以使用各种loader，比如css转换，图片压缩等
  'module': {
    'rules': [
      {
        'test': /\.jsx?$/,
        'exclude': /node_modules/,
        'include': path.resolve('./src'),
        'use': [
{
          'loader': 'babel-loader',
          'options': {
            'cacheDirectory': true
          }
        }
]
      },
      {
        'test': /\.css/,
        'use': [{ 'loader': MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader'],
        'exclude': /node_modules/,
        'include': path.resolve(dirname, 'src')
      },
      {
        'test': /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        'use': [
          {
            'loader': 'url-loader',
            'options': {
              'limit': 7500000,
              'name': 'images/[name]-[hash:5].min.[ext]'
            }
          }
        ]
      },
      {
        'test': /\.less/,
        'use': [{ 'loader': MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader', 'less-loader'],
        'exclude': /node_modules/,
        'include': path.resolve(dirname, 'src')
      }
    ]
  },
  // 插件，用于生成模板和其它功能
  'plugins': [
    new MiniCssExtractPlugin({
      'filename': cssFilename,
      'chunkFilename': cssChunkFilename
    })
  ],
  // 可配置本地的webpack开发服务功能
  'devServer': {}
};
