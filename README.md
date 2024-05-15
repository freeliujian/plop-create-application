# plop-create-application
使用plop写的一个较为简单的前端脚手架

## 使用

实时编译
```
npm run watch 
```

调式
```
npm run start
```

## 配置bin
在`package.json`中添加
``` json
 "bin": {
    "xxxx": "./dist/cli/run.js"
  },
```
然后
```
npm publisher
```
or 本地调式
```
npm link
```
运行 
根据plop可以直接使用 `xxx --component name`
```
xxx
```