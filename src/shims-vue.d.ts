/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.md' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}