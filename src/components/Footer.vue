<template>
  <div class="footer">{{num}} 个项目</div>
</template>

<script lang="ts">
import { watch, defineComponent, computed } from "@vue/composition-api";
import { pwdFiles} from "@/utils/fileUtils"
import { routerStore } from "@/store/routerStore";
import { infoStore } from "@/store/infoStore";

export default defineComponent({
  setup() {
    const num = computed(() => {
      const fileSet = pwdFiles(infoStore.getState().manifest, routerStore.pwd)
      return fileSet.length;
    });
    return {
      num
    };
  }
});
</script>

<style lang="stylus" scoped>
.footer{
  user-select none
  padding-left .8rem
  color rgb(76,96,122)
}
</style>