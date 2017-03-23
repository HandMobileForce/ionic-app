# [Hand Portal] &middot; [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![Build Status](https://img.shields.io/travis/facebook/react/master.svg?style=flat)](https://travis-ci.org/facebook/react) [![Coverage Status](https://img.shields.io/coveralls/facebook/react/master.svg?style=flat)](https://coveralls.io/github/facebook/react?branch=master) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)


# 汉得移动门户种子工程项目

这个一个基于Ionic1的移动门户种子工程，还在完善中


## 特点
**此工程在ionic1的基础上进行改进，使他成为一个强大的门户集成平台.** 
* 解决了白屏闪屏的问题.
* 优化了页面切换的性能.
* 启用iOS的WKWebview，优化内存和性能.
* 加入了一整套完善的原生接口.
* 加入了热更新功能和在线，离线应用功能.
* 加入动态菜单，菜单权限和菜单管理的功能.
* 加入标准通讯录功能.
* 加入标准工作流的功能.
* 加入消息中心和即时通讯的功能.

## 目录
 - [如何开始](#如何开始)
 - [功能例子](#功能例子)
 - [App预览](#App预览)
 - [文件结构](#文件结构)


## 如何开始

* 安装cordova `npm -g install cordova@6.3.1`.
* 安装ionic `npm -g install ionic@1.7.16`.
* 安装gulp `npm install`.
* 克隆地址: `git clone https://github.com/driftyco/ionic-conference-app.git`.
* gulp构建环境 `npm install`.
* JavaScript依赖包引入 `bower install`.
* 构建运行环境 `gulp run-dev`.
* 监听 `gulp watch`.

**Note:** Is your build slow? Update `npm` to 3.x: `npm install -g npm`.

## 功能例子

* 主菜单界面 - [ [模版](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.html) | [代码](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.ts) ]

## App 预览

App功能预览.

- [主菜单界面](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.html)

  <img src="resources/screenshots/SchedulePage.png" alt="Schedule">


- [通讯录界面](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/about/about.html)

  <img src="resources/screenshots/AboutPage.png" alt="Schedule">


- To see more images of the app, check out the [screenshots directory](https://github.com/driftyco/ionic-conference-app/tree/master/resources/screenshots)!


## 文件结构

```
hand-portal-app/
├-- .github/                            * GitHub files
│   ├── CONTRIBUTING.md                 * Documentation on contributing to this repo
│   └── ISSUE_TEMPLATE.md               * Template used to populate issues in this repo
|
|-- resources/
|
|-- app/
|    |-- pages/
|    |    ├── app.component.js
|    |    └── app.module.js
|    |    └── app.template.html
|    |    └── main.js
|    |
|    |-- index.html
|
|-- www/
|    ├── assets/
|    |    ├── data/
|    |    |    └── data.json
|    |    |
|    |    ├── fonts/
|    |    |     ├── ionicons.eot
|    |    |     └── ionicons.svg
|    |    |     └── ionicons.ttf
|    |    |     └── ionicons.woff
|    |    |     └── ionicons.woff2
|    |    |
|    |    ├── img/
|    |
|    └── build/
|    └── index.html
|
├── .editorconfig                       * Defines coding styles between editors
├── .gitignore                          * Example git ignore file
├── LICENSE                             * Apache License
├── README.md                           * This file
├── config.xml                          * Cordova configuration file
├── package.json                        * Defines our JavaScript dependencies
```
