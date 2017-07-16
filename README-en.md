# Wecat
A modularization solution of wechat app

## Install
```
npm install -g wecat
```

## Usage
Start a new wecat project. This will create a lockfile `wecat.json` in project root.
```
wecat init
```

Install all dependencies from lockfile. Include `Download` and `Link`.
```
wecat install
```

Downloads all files depending on targets
```
wecat download
```

Link command will copy files from node_modules. You should install all npm packages manually first.
```
wecat link
```

## Localfile
`wecat.json`

```
{
  "root": "./",
  "target": [],
  "link": {}
}
```

`target` is an array of files deliveryed by github/npm.

For example
```
{
  "name": "mathiasbynens/base64",
  "version": "v0.1.0",
  "filename": "lib/base64.js",
  "path": "base64.js" 
}
```



