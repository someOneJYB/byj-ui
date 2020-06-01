const fs = require('fs');
const path = require('path');

const libPath = path.resolve(__dirname, '../lib');
const esPath = path.resolve(__dirname, '../es');
const libDir = fs.readdirSync(path.resolve(__dirname, libPath));
const esDir = fs.readdirSync(esPath);
const { exec } = require('child_process');


const cssFile = path.resolve(__dirname, '../lib/style/css');
libDir.splice(libDir.indexOf('index'), 1);
libDir.splice(libDir.indexOf('style'), 1);
libDir.forEach((item) => {
  if (fsExistsSync(`${libPath}/${item}/index.css`)) {
 return;
}
  fs.copyFileSync(`${cssFile}/${item}.css`, `${libPath}/${item}/index.css`);
});
esDir.splice(libDir.indexOf('index'), 1);
//
esDir.forEach((item) => {
  if (fsExistsSync(`${esPath}/${item}/index.css`)) {
 return;
}
  fs.copyFileSync(`${cssFile}/${item}.css`, `${esPath}/${item}/index.css`);
});
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }

return true;
}

exec(`cp -r  ${path.resolve(__dirname, '../lib/style')}   ${path.resolve(__dirname, '../es/')}`, (err, stdout, stderr) => {
  if (err) {
    console.log(err);

return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// 作为style文件夹移动lib和es下面
// fs.unlinkSync(path.resolve(__dirname, '../dist')+'/js')
// fs.copyFileSync(path.resolve(__dirname, '../dist'),libPath+'/style');
// fs.copyFileSync(path.resolve(__dirname, '../dist'),esPath+'/style');
