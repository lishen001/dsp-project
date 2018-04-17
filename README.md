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

# 技术选型

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
