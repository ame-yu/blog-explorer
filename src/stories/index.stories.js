import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import OpenWith from '../components/OpenWith.vue'

export default {
  component: OpenWith,
  title: 'OpenWith'
}

export const basic = () => ({
  components: { OpenWith },
  template: '<OpenWith />',
  
})


