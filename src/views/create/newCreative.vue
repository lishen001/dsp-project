<template>
  <!-- 创意页 -->
  <el-col :span="21">
    <h1>广告创意</h1>
    <h4>落地页</h4>
    <el-col :span="24">
      <el-col :span="2.5">
        着陆页地址：
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请设置广告名称" v-model="input">
          <template slot="append">预览</template>
        </el-input>
      </el-col>
    </el-col>
    <h4>上传创意</h4>
    <el-col :span="24" class="add-creative">
      <span @click="toCreate">+添加创意</span>
      <!-- 上传图片 -->
      <dsp-tab>
        <dsp-tab-item></dsp-tab-item>
      </dsp-tab>
      <el-col :span="24" v-if='flag'>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-col>
    <el-button type="info" plain>提交</el-button>
  </el-col>
</template>

<script>
import dspTab from '@/components/dsp-tab'
import dspTabItem from '@/components/dsp-tab-item'
export default {
  components: {
    dspTab,
    dspTabItem
  },
  data () {
    return {
      input: '',
      flag: false,
      imageUrl: ''
    }
  },
  methods: {
    toCreate () { // 显示弹出框
      this.$confirm('', '选择模板', {
        confirmButtonText: '多图',
        cancelButtonText: '单图',
        center: true
      }).then(() => {
        console.log('多图')
      }).catch(() => {
        console.log('单图')
        this.flag = true
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style scoped>
  .add-creative{
    border-bottom: 1px solid #eee;
    padding: 12px 0;
  }
  .el-submenu .el-menu-item{
    min-width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-submenu__title{
    display: none;
  }
  .el-row{
    height:100%;
    overflow-y: scroll;
  }
  .el-menu.el-menu-vertical-demo{
    width:100%;
  }
</style>
