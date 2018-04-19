# dsp-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 技术选型

  vue,vuex,element-ui,echarts

## 目录

  view
    vue-router

  model
    vuex

  common

  static

  utils

## 脚手架

  vue-cli, eslint

## 说明

  安装element-ui

  npm i element-ui@next -D

  引入 Element
  你可以引入整个 Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。

  完整引入
  在 main.js 中写入以下内容：
```js
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import App from './App.vue';

  Vue.use(ElementUI);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
```
  以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。

  按需引入
  借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

  首先，安装 babel-plugin-component：

  npm install babel-plugin-component -D
  然后，将 .babelrc 修改为：
```js
  {
    "presets": [["es2015", { "modules": false }]],
    "plugins": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
  }
```
  接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：
```js
  import Vue from 'vue';
  import { Button, Select } from 'element-ui';
  import App from './App.vue';

  Vue.component(Button.name, Button);
  Vue.component(Select.name, Select);
  /* 或写为
  * Vue.use(Button)
  * Vue.use(Select)
  */

  new Vue({
    el: '#app',
    render: h => h(App)
  });
```
## 项目流程图

https://github.com/lishen001/dsp-project/blob/master/dsp%E9%A1%B9%E7%9B%AE%E6%B5%81%E7%A8%8B%E5%9B%BE.png

## dsp 智能业务支持系统CMS 广告管理项目总结

### 整体技术选型 (包括脚手架和框架 ES6 LESS 等)

vue

使用vue-cli脚手架

使用nodejs配置本地服务器

es6语法

如果使用less预处理需要下载相关插件及配置相关信息
本项目暂未使用less

### 路由搭建，路由拦截的实现，权限接口设计

路由搭建
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '../store/store'
Vue.use(VueRouter)
let router = new VueRouter({
  routes
})
// 用 vue-route 的 beforeEach 实现导航守卫（路由跳转前验证登录）
const checkLoginStatus = () => {
  let tk = localStorage.getItem('token')
  if (tk) {
    store.commit('saveUser', localStorage.getItem('username'))
  }
  return !!tk
}
router.beforeEach((to, from, next) => {
  let isLogin = checkLoginStatus()
  if (to.name === 'login') {
    next()
  } else {
    if (!isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

export default router
```

### 数据请求以及如何封装全局请求接口

请求拦截、响应拦截以及封装全局请求接口

https://github.com/lishen001/dsp-project/blob/master/src/utils/request.js

### 项目中的核心功能和难点功能介绍

* 核心功能

数据请求拦截

对elementUi及相关功能组件的使用

echarts库的正确使用及图表的更新

* 难点功能

时间区间的处理与计算

自定义组件的封装

图片上传功能


### 数据管理（store 是如何管理和维护数据的）

使用vuex管理及维护数据

https://github.com/lishen001/dsp-project/tree/master/src/store

### 遇到的困难，以及解决方式 （自定义组件）

自定义组件的封装

### 打包上线
