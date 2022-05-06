<template>
  <div class="entity" ref="container">
    <div class="entity-title">{{name}}</div>
    <div class="entity-item" v-for="item in attributes" :key="item.name">
      <a-tooltip placement="top" :title="item.name" :getPopupContainer="getPopupContainer">
        <div class="name">{{item.name}}</div>
      </a-tooltip>
    </div>
  </div>
</template>
<script>
import { defineComponent, toRefs, onMounted, inject, reactive, ref } from 'vue'
export default defineComponent({
  inject: ["getGraph", "getNode"],
  setup(props) {
    const container = ref()
    const getGraph = inject('getGraph')
    const getNode = inject('getNode')
    console.log(props, getNode(), getGraph())
    const state = reactive(getNode().getData())
    return {
      ...toRefs(state),
      container,
      getPopupContainer: () => container.value,
    }
  }
})

</script>
<style>
.entity{
  border: 1px solid #3b4cc9;
  width: 200px;
  height: auto;
  background: #eee;
}
.entity-title{
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #3b4cc999;
  color: #fff;
}
.entity-item{
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #3b4cc9;
}
.entity-item:first-child{
  border-top: none;
}
</style>
