<template>
  <el-row>
    <el-col :span="3">
      <el-menu
        default-active="2"
        :default-openeds="['1','2','3']"
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">建立广告计划</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选择计划</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>广告单元</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">基本信息</el-menu-item>
            <el-menu-item index="2-2">定向</el-menu-item>
            <el-menu-item index="2-3">广告位</el-menu-item>
            <el-menu-item index="2-4">出价</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>广告创意</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">落地页</el-menu-item>
            <el-menu-item index="3-2">上传创意</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <new-creative></new-creative>
    </el-col>
  </el-row>
</template>

<script>
import newCreative from './newCreative'
export default {
  components: {
    newCreative
  }
}
</script>

<style>
  .el-menu-item{
    width:100%;
  }
</style>
