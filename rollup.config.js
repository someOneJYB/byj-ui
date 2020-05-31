import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

const fs = require('fs')
const INPUT_FILE_PATH = './src/index.js';
const OUTPUT_NAME = 'Example';

const GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes'
};

const PLUGINS = [
  postcss({
    extract: false,
    inject: false,
    extensions: ['.less'],
    plugins: [
      autoprefixer,
    ],
  }),
  babel({
    exclude: 'node_modules/**',
  }),
  localResolve(),
  resolve({
    browser: true,
  }),
  commonjs(),
  filesize(),
];

const EXTERNAL = [
  'react',
  'react-dom',
  'prop-types',
];

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

let config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    globals: GLOBALS,
  },
  external: EXTERNAL,
  plugins: PLUGINS,
}));



const readDir = fs.readdirSync("./src").slice(0, -1);
const resultFile =  {};
readDir.splice(readDir.indexOf('images'), 1)
readDir.splice(readDir.indexOf('index'), 1)
let v = readDir.map(item => {
  resultFile[item] = './src/'+item +'/index.js'
  return {
    input: './src/'+item +'/index.js',
    output: {
      file: 'lib/' + item + '/index.js',
      format: 'cjs',
    }
  }
})
let v2 = readDir.map(item => {
  return {
    input: './src/'+item +'/index.js',
    output: {
      file: 'es/' + item + '/index.js',
      format: 'es',
    }
  }
})
let all = v.concat(v2);
config = all.map(item => {
  return {
    input: item.input,
    output: {
      file: item.output.file,
      format: item.output.format,
      globals: GLOBALS,
    },
    external: EXTERNAL,
    plugins: item.plugins || PLUGINS,
  }
})
export default config;
