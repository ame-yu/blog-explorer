<template>
  <div class="reader" v-html="raw"></div>
</template>

<script lang="ts">
import shelf from "@/store/idb/shelf"
import { defineComponent, computed,ref } from "@vue/composition-api";
import { routerStore } from "@/store/routerStore";
import marked from "marked"

export default defineComponent({
  setup() {
    const raw = ref("Loading")
    shelf.open().query(routerStore.pwd).then(res => {
      console.log(res)
      raw.value =  marked(res)
    })
    return {
        raw
    }
  }
});
</script>
<style lang="stylus">
  .reader{
    @import '../css/themedefault.styl';
    width 100%
  }
</style>