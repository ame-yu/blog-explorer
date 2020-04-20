<template>
  <div class="menu">
    <div class="item">文件</div>
    <div class="item">计算机</div>
    <div class="item">查看</div>
  </div>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
export default defineComponent({
  setup() {
    //
  }
});
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

.menu {
    user-select none
  height: 1.6rem;
  border-bottom: 1px solid #ccc;
  .item {
    display inline-block
    padding 0 1rem 0 1rem
    line-height 1.6rem
    font-size 12px
    &:first-child {
      background: darken(windows-blue, 5);
      color #fff
    }
  }
}
</style>