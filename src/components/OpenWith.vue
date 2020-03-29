<template>
  <div class="open-with">
    <div class="title">你要如何打开这个文件?</div>
    <div class="select">
      NotePad
    </div>
  </div>

  
</template>

<script lang="ts">
import { watch, defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  setup() {
      //
  }
});
</script>

<style lang="stylus" scoped>
    .open-with{
        user-select none
        border 1px solid #ccc
        min-height 30rem
        width 24rem
        .title{
            padding 1rem 0 1rem 2rem 
            font-size 18px
        }
        .select{
            padding .5rem 0 .5rem 2rem
            min-height 3rem
            transition .1s
            &:hover{
                background #cfcfcf
            }
            &:active{
                transform scale(.96)
            }
        }
    }
</style>