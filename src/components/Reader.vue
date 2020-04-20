<template>
  <div class="reader" v-html="raw"></div>
</template>

<script lang="ts">
import shelf from "@/store/idb/shelf"
import { defineComponent, ref } from "@vue/composition-api";
import { routerStore } from "@/store/routerStore";
import loader from "@/config/loader"
export default defineComponent({
  setup() {
    const fileName = routerStore.pwd
    const raw = ref("Loading")
    shelf.open().query(fileName).then(res => {
      const html = loader(fileName, res) as string
      raw.value =  html
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