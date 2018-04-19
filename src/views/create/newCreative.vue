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
      <!-- 上传图片 -->
      <dsp-tab :tabData="tabData" :editable="true" @edit="editFunc">
        <dsp-tab-item v-for="x in tabData" :slot="x.name" :key="x.name">
          <uploader></uploader>
        </dsp-tab-item>
      </dsp-tab>
    </el-col>
    <el-button type="info" plain>提交</el-button>
  </el-col>
</template>

<script>
import dspTab from '@/components/dsp-tab'
import dspTabItem from '@/components/dsp-tab-item'
import uploader from './uploader'
export default {
  components: {
    dspTab,
    dspTabItem,
    uploader
  },
  data () {
    return {
      input: '',
      flag: false,
      imageUrl: '',
      isShow: false,
      isOrigin: false,
      activeName: "first",
      len:1,
      tabData:[
        {
          label:'创意1',
          name:'tab-content-1'
        }
      ]
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
    },
    cb(e){
      let FD = new FormData()
      let file = e.target.files[0]
          FD.append("file",file)
      this.$http.post('http://localhost:9000/dsp-creative/creative/upload',FD).then(res=>{
        console.log(res)
      })
    },
    editFunc(){
      this.tabData.push({
        label:"创意"+(++this.len),
        name:'tab-content-'+this.len
      })
    },
    newTab() {
      console.log(123)
    },
    fn(data) {
      console.log(data)
    },
    handleEdit(target, action) {
      console.log(target)
      console.log(action)
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
