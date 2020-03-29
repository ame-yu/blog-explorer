<template>
   <svg class="icon" aria-hidden="true">
        <use :xlink:href="iconId" />
    </svg>
</template>


<script lang="ts">
import { defineComponent } from "@vue/composition-api";
interface Props {
  iconName: string;
}

export default defineComponent({
  name: "Icon",
  props: {
    iconName: {}
  },
  setup(props: Props) {
    //
    return {
        iconId: `#icon-${props.iconName}`
    }
  }
});
</script>


<style lang="stylus" scoped>

</style>