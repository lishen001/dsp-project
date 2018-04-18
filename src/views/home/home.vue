<template>
  <div>
    <el-row :gutter="24">
      <el-header class="home-header">
        <el-col :span="12">整体情况</el-col>
        <!-- 选择月份 -->
        <el-col :span="12">
          <el-date-picker
            v-model="startTime"
            type="month"
            placeholder="选择月">
          </el-date-picker>
          <el-date-picker
            v-model="endTime"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-col>
      </el-header>
    </el-row>
    <el-main>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-card shadow="always" v-on:click.native="test">
            曝光量（次）
            <h3>278,456</h3>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            点击量（次）
            <h3>278,456</h3>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never">
            点击量（次）
            <h3>278,456</h3>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never">
            点击量（次）
            <h3>278,456</h3>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select title="曝光量"></el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select title="点击数"></el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div ref="echarts" class="echarts"></div>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import {init} from 'echarts'
import elSelect from '../../components/ElSelect'
export default {
  name: 'home',
  data () {
    return {
      value: '',
      startTime: '',
      endTime: '',
      xAxisList: [1, 2, 3, 4, 5],
      instance: null
    }
  },
  components: {
    elSelect
  },
  mounted () {
    let graph = init(this.$refs.echarts)
    this.instance = graph
    let option = {
      xAxis: {
        type: 'category',
        data: this.xAxisList,
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
    graph.setOption(option)
  },
  watch: {
    startTime () {
      this.getAllMonths(this.startTime, this.endTime)
    },
    endTime () {
      this.getAllMonths(this.startTime, this.endTime)
    }
  },
  methods: {
    test () {
      let that = this
      this.$http.post('/dsp-report/index', {
        count: that.xAxisList.length
      }).then(res => {
        that.instance.setOption({
          xAxis: {
            type: 'category',
            data: that.xAxisList,
            boundaryGap: false
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: res.data.dataY1,
              type: 'line'
            }
          ]
        })
      })
    },
    getAllMonths (start, end) {
      this.xAxisList = []
      if (start && end) {
        let startY = start.getFullYear(), // '开始的年份'
          endY = end.getFullYear(), // '结束的年份'
          startM = start.getMonth() + 1, // '开始的月份'
          endM = end.getMonth() + 2 // '结束的月份'
        while (new Date(startY, startM) < new Date(endY, endM)) {
          if (startY < endY) { // 跨年
            if (startM <= 12) {
              this.xAxisList.push(`${startY}/${startM}`)
              startM = startM + 1
            } else {
              startY = startY + 1
              startM = 1
            }
          } else if (startY === endY) { // 不跨年
            if (startM <= endM) {
              this.xAxisList.push(`${startY}/${startM}`)
            }
            startM = startM + 1
          } else { //
            return
          }
        }
      }
    }
  }
}
</script>

<style>
.el-col.el-col-12, .nav-menu{
  height:100%;
}
.el-menu.el-menu-vertical-demo{
  width:240px;
  height:100%;
  border:0;
}
.echarts{
  width:100%;
  height:300px;
}
.home-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
</style>
