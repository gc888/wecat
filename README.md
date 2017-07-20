# Wecat
微信小程序模块化方案

[English](README-en.md)

微信小程序没有成熟的包管理体系，现有类库的引入基于手动组织文件代码结构，更是缺乏版本控制。wecat 尝试沟通 github/npm 生态，主要特性如下:
- 依赖声明
- 类库自动安装
- 版本管理 
- Waiting for more...

## 安装
全局安装提供命令行工具。
```
npm install -g wecat
```

## 使用
- 初始化项目，将在项目根目录新建 `wecat.json`。
```
wecat init
```
- `Install` 安装 `wecat.json` 中声明的所有依赖，包括 `Download` 和 `Link` 两阶段。`Download` 从 github/npm CDN 上下载对应版本包中指定路径的文件到指定本地目录中。`Link` 负责复制项目 `node_modules` 已安装包中的指定文件到本地目录，此目的在于访问私有仓库包。
```
wecat install
```
还可以单独执行 `Download`/`Link` 命令。
```
wecat download
或
wecat link
```
- 所使用的类库需支持 `CommonJS` 规范, 并注意检测是否兼容小程序环境，如正确处理 `global` is undefined 等问题。由于直接使用单文件，其中不得 `require` 其他无法引用到的文件及全部`node_module`。

## 定义
`wecat.json` 文件结构大致如下。
```
{
  "root": "./",
  "target": [],
  "link": {}
}
```

|字段|类型|含义|属性|
|---|---|---|---|
|`root`|`String`|定义小程序 app 目录，安装文件将相对于此目录。|`optional, default:'./'`|
|`target`|`Array`|声明来自于`github/npm` CDN 的依赖|`required`|
|`link`|`Object`|声明来自于 `node_modules` 的依赖|`required`|

`Target`结构体：

|字段|含义|
|---|---|
|`name`|包名(repo/name)|
|`version`|Release 版本|
|`filename`|下载到小程序目录的位置|
|`path`|Release 包中文件路径|
|`source`|包来源, 可选，默认为 `github`，`npm` 时访问 `npmcdn` 上的资源|

举例：
```
...
"target": [
  ...,
  {
    "name": "mathiasbynens/base64",
    "version": "v0.1.0",
    "filename": "lib/base64.js",
    "path": "base64.js" 
  }, 
  ...
]
...
```

执行 `Link` 前先完成 `npm install` 操作，版本管理通过 `npm` 完成，建议锁定版本。

`Link`结构体：
```
"link": {
  ...
  "vue": {
    "filename": "lib/vue.esm.js",
    "path": "dist/vue.esm.js", 
  },
  ...
}
```

