###  生成 lib 和 es 文件
```js
yarn build
```
### 生成 css、image 文件
```js
yarn build:static
```
### 执行测试在 example 文件夹中执行测试
```js
yarn start
```
### rollup 打包 js 和 webpack 打包静态

```js
{
  "hooks": {
    "pre-commit": "npm run build",
    "commit-msg": "npm run commitmsg",
    "pre-push": "npm run test"
  }
}

```
