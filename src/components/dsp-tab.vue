<template>
  <div class="dsp-tab">
    <ul>
      <li
        @click = "changeActive(index)"
        :class = "index === selected ? 'active':''"
        v-for="(x,index) in tabData"
        :key='index'>
        {{x.label}}
      </li>
      <li @click="addTab" v-if="editable">+添加创意</li>
    </ul>
    <div class="content">
      <div v-for="(x,idx) in tabData" v-show="idx==selected" :key="idx">
        <slot :name="x.name"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'dspTab',
  data () {
    return {
      selected:0
    }
  },
  props: {
    tabData: {
      required:true,
      type:Array
    },
    editable: {
      required:true,
      type:Boolean
    }
  },
  watch:{
    '$slots': function(n,o) {
      console.log(n)
    }
  },
  methods: {
    addTab () {
      this.$emit('edit');
      console.log(this.$slots)
    },
    changeActive(index) {
      console.log(index)
      this.selected = index;
      this.selectedContent = this.tabData[index].name
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
  .dsp-tab{
    margin-bottom: 10px;
  }
  .dsp-tab ul{
    display: flex;
  }
  .dsp-tab li{
    list-style: none;
    border-bottom: 2px solid #fff;
  }
  .dsp-tab .active{
    border-bottom-color: blue;
  }
</style>
