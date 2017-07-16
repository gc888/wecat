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

Install all libraries from lockfile.
```
wecat install
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

