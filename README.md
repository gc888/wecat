# Wecat
微信小程序模块化方案

## 安装
```
npm install -g wecat
```

## 使用
1. 初始化项目，将在项目根目录新建 `wecat.json`.
```
wecat init
```
2. 安装 `wecat.json` 中声明的所有依赖，包括 `Download` 和 `Link` 两阶段。
```
wecat install
```
还可以单独执行 `Download`/`Link` 命令。
```
wecat download
或
wecat link
```

## `wecat.json`
文件结构大致如下.
```
{
  "root": "./",
  "target": [],
  "link": {}
}
```

举例：
```
{
  "name": "mathiasbynens/base64",
  "version": "v0.1.0",
  "filename": "lib/base64.js",
  "path": "base64.js" 
}
```

