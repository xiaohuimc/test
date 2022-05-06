/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/* eslint-disable */
// antv-x6-vue-teleport-view
declare module 'antv-x6-vue-teleport-view' {
    export function useTeleport(viewId: string): any
}
