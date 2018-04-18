<template>
  <div id="app">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['2']" router>
          <el-menu-item index="/create">新建广告</el-menu-item>
          <el-menu-item index="/home">首页概览</el-menu-item>
          <el-submenu index="2">
            <template slot="title">广告管理</template>
            <el-menu-item-group>
              <el-menu-item index="/plan">广告计划</el-menu-item>
              <el-menu-item index="/unit">广告单元</el-menu-item>
              <el-menu-item index="/creative">广告创意</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/centre">数据中心</el-menu-item>
          <el-menu-item index="/tool">工具箱</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{username}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['username'])
  },
  components: {}
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  margin:0;
  padding:0;
}
#app {
  width: 100%;
  height: 100%;
}
h1,h2,h3,h4,h5,h6,p{
  margin:0;
  padding:0;
}
</style>
