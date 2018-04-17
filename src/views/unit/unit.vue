<template>
  <div>
    <!-- 单元页 -->
    <h1>12345单元</h1>
    <p>所有广告计划>DD-广告测试团队-20171102-4>12345</p>
    <el-row>
      <el-col :span="24" type="flex" justify="space-between">
        <el-col :span="4">单元：20171102</el-col>
        <el-col :span="6">投放周期：2017/5/1-2017/5/3</el-col>
        <el-col :span="6">定向：男，小学，10-16岁，北京</el-col>
        <el-col :span="4">出价方式：CPC</el-col>
        <el-col :span="4">出价：1.5元</el-col>
      </el-col>
    </el-row>
    <h1>广告创意</h1>
    <!-- 模糊搜索与状态查询 -->
    <el-row :gutter="24">
      <el-col :span="12">
        <el-input v-model="input" placeholder="请输入关键字查询"></el-input>
      </el-col>
      <el-col :span="12">
        <!-- 下拉框 -->
        <el-select></el-select>
        <el-button type="info">查询</el-button>
      </el-col>
    </el-row>
    <!-- 新建创意、批量修改、订单日期、自定义列 -->
    <el-row :gutter="24" type="flex" justify="space-between">
      <el-col :span="12">
        <el-button type="primary" @click='toCreative'>+新建创意</el-button>
        <!-- 下拉框 -->
        <el-select title='批量修改'></el-select>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="请选择订单日期">
        </el-date-picker>
        <!-- 下拉框 -->
        <el-select title='自定义列'></el-select>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table></el-table>
    <!-- 分页器 -->
    <el-pagination></el-pagination>
  </div>
</template>

<script>
import elTable from '../../components/ElTable'
import elPagination from '../../components/ElPagination'
import elSelect from '../../components/ElSelect'
export default {
  data() {
    return {
      input: '',
      value1: ''
    }
  },
  components: {
    elSelect,
    elTable,
    elPagination
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    toCreative() {
      this.$router.push({
        name: 'newCreative'
      })
    }
  }
}
</script>

<style>

</style>
