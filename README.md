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

## 脚手架

  vue-cli, eslint

## 目录

  * src

    view

    components

    router

    store

    utils

  * server

  * static

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

https://github.com/lishen001/dsp-project/blob/master/dsp%E9%A1%B9%E7%9B%AE%E6%B5%81%E7%A8%8B%E5%9B%BE.png?raw=true

## 项目总结

* dsp 智能业务支持系统CMS 广告智能投放管理系统

### 整体技术选型 (包括脚手架和框架 ES6 LESS 等)

* vue

  vue和react开发都可以。特点：如果需要改变任何元素的状态，那么是先在Virtual DOM上进行改变，而不是直接改变真实的DOM。当有变化产生时，一个新的Virtual DOM对象会被创建并计算新旧Virtual DOM之间的差别。之后这些差别会应用在真实的DOM上。

  因为公司的发展趋势以及团队条件所以选择vue更易于维护

* 使用vue-cli脚手架

  完整的vue实际应用,
  包括：模块化，转译，预处理，热加载，静态检测和自动化测试等。
  对于一个需要长期维护和大型的项目而言，这些工具是必不可少的，但是尝试配置初始化这些很痛苦.这就是我们使用vue-cli的原因

* 使用nodejs配置本地服务器

  由于后台的工作量大，接口还没有开发出来，所以前端端利用node搭建一个本地服务器，模拟后台接口，封装fetch方法请求后台接口数据，后台接口数据使用mock进行模拟，返回数据使用vuex将数据存放起来，操作数据，渲染页面。

* es6语法

  ES6包含了一些很棒的新特性,可以更加方便的实现很多复杂的操作,提高开发效率。

* less

  Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

  Less 可以运行在 Node 或浏览器端。

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

1. 路由以及数据请求拦截。
路由拦截如果本地存储中没有token字段默认跳转到登录路由

2. 用户登录操作，以及用户信息数据管理

3. 对elementUi及相关功能组件的使用。
极大的方便页面的构建，以及项目的实施

4. echarts库的正确使用及图表的更新

* 难点功能

1. 时间区间的处理与计算

2. 自定义组件的封装

3. 图片上传功能

### 数据管理（store 是如何管理和维护数据的）

使用vuex管理及维护数据

vuex主要由三部分组成:state mutation action

Vuex中store数据改变的唯一方法就是mutation

mutation都有一个字符串类型的事件类型(type)和回调函数(handler) 先注册事件，当触发响应类型的时候调用handker()，调用type的时候需要用到store.commit方法。 在数据管理的组件中请求后台接口，返回数据，存在在vuex的state中，当有数据改动的时候$store.commit('')触发mutation函数更新数据，如果有涉及到异步转同步，需要使用$store.dispatch()触发action函数更新数据。

代码  https://github.com/lishen001/dsp-project/tree/master/src/store

### 遇到的困难，以及解决方式 （自定义组件）

1. 在添加用户信息，上传图片的时候遇到了一些问题，用自己封装的组件，以及一些逻辑的判断解决了这个问题。

所以一些第三方插件极大的方便了项目的实施以及构建，但并不能解决全部的问题，需要利用自己的专业技能做出更好的理解和判断才能解决最终的问题。

2. 在使用vuex的时候需要解决异步的问题，所以利用vuex的action解决了异步的问题，但是在子父传参的时候遇到一个问题，就是在父组件定义了变量，将vuex返回的数据直接赋给了变量，然后将动态变量传递到子组件的时候会出现数据获取不到的情况，有时候刷新页面会显示出来，解决的办法就是直接将vuex的数据赋给动态变量然后解决了问题。

### 打包上线
