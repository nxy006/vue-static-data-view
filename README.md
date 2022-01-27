# vue-static-data-view

简单且易拓展的静态数据展示单页应用


## 项目介绍

`vue-static-data-view` 是基于 vue3 + elementPlus 构建的单页数据展示应用，支持将静态 json 数据在单页应用中展示并提供常用的筛选功能。


## 如何使用

在 Release 页面可以看到历史发布列表，下载压缩包，即可看到以下项目：

```
+ css
+ js
+ images
- config.json
- data.json
- favicon.ico
- index.html
```


使用本项目只需要修改以下文件：

- `data.json` 保存原始数据，数据以 Json 列表形式记录即可
- `config.json` 保存数据的处理、展示配置，包括数据如何解析、筛选、排序和展示
- `custom.css` 如果需要自定义布局配置，可修改本 CSS 配置


## 运行项目

如果希望自己修改项目、贡献新功能，可下载原始项目，使用以下命令进行运行、调试


### 项目启动

```
npm install
```

### 编译并开发热部署

```
npm run serve
```

### 编译生产包

```
npm run build
```
