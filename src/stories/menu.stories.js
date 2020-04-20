

import ContextMenu from '../components/ContextMenu.vue'

export default {
  component: ContextMenu,
  title: 'ContextMenu'
}

export const basic = () => ({
  components: { ContextMenu },
  template: '<ContextMenu />',
})


