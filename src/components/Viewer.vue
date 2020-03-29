<template>
<div class="viewer">
  <Reader v-if="isFile"/>
  <Explorer v-else-if="!isFile"/>
</div>
  
</template>

<script lang="ts">
import { watch, defineComponent, computed } from "@vue/composition-api";
import Explorer from "@/components/Explorer.vue";
import Reader from "@/components/Reader.vue";
import { infoStore } from "@/store/infoStore";
import { routerStore } from "@/store/routerStore";

export default defineComponent({
  components: {
    Explorer,
    Reader,
  },
  setup() {
    
    const isFile = computed(()=> {
      const manifest = infoStore.getState().manifest;
      const pathList = Object.keys(manifest)
      return pathList.includes(routerStore.pwd)
    })
    return {
      isFile
    };
  }
});
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

.viewer {
  overflow-x hidden
  height 100%
  flex: 3
  padding-top .4rem
}
</style>