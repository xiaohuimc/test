<template>
  <TeleportContainer />
  <div ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, h } from 'vue'
import { Graph, Shape } from "@antv/x6";
import '@antv/x6-vue-shape';
import { useTeleport } from "antv-x6-vue-teleport-view";
import Entity from './Entity.vue';


const defaultViewId = 'antv-x6-vue-teleport-view'

// 注册一个自定义组件
Graph.registerNode("entity", {
  inherit: "vue-shape",
  view: defaultViewId,
  x: 200,
  y: 150,
  width: 200,
  height: 100,
  component: {
    render: () => h(Entity),
  },
});

// 这个是为了提升自定义节点渲染性能的
const TeleportContainer = useTeleport(defaultViewId);

export default defineComponent({
  components: {
    TeleportContainer
  },
  setup(props) {
    const container = ref()
    onMounted(() => {
      const graph = new Graph({
        container: container.value,
        width: 1000,
        height: 800,
        grid: true,
        connecting: {
          router: {
            name: 'er',
            args: {
              offset: 25,
              direction: 'H',
            },
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                },
              },
            })
          },
        },
      });
      graph.addNode({
        id: "student",
        shape: 'entity',
        x: 100,
        y: 100,
        data: {
          name: '学生',
          attributes: [
            {name: 'ID', type: 'STRING'},
            {name: 'Name', type: 'STRING'},
            {name: 'Class', type: 'NUMBER'},
            {name: 'Gender', type: 'BOOLEAN'},
          ]
        },
      });
      graph.addNode({
        id: "curriculum",
        shape: 'entity',
        x: 400,
        y: 300,
        data: {
          name: '课程',
          attributes: [
            {name: 'ID', type: 'STRING'},
            {name: 'Name', type: 'STRING'},
            {name: 'StudentID', type: 'STRING'},
            {name: 'TeacherID', type: 'STRING'},
            {name: 'Description', type: 'STRING'},
          ]
        },
      });
      graph.addNode({
        id: "teacher",
        shape: 'entity',
        x: 700,
        y: 450,
        data: {
          name: '老师',
          attributes: [
            {name: 'ID', type: 'STRING'},
            {name: 'Name', type: 'STRING'},
            {name: 'Age', type: 'NUMBER'},
          ]
        },
      });

      graph.addEdge({
        id: 's2c',
        source: "student",
        target: "curriculum",
      })
      graph.addEdge({
        id: 't2c',
        source: "teacher",
        target: "curriculum",
      })
    })
    return {
      container,
    }
  }
})
</script>

<style scoped>
</style>
