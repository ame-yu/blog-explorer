<template>
  <div class="context-menu">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
  </div>
</template>

<script>
import { defineComponent, computed} from "@vue/composition-api";
export default defineComponent( {
    setup(){
        //
    }

})
</script>

<style lang="stylus" scoped>
    .context-menu{
        border-radius .2rem
        box-shadow 0px 0px 10px #aaa
        width 15rem
        padding .2rem 0 .2rem 0
        height 20rem
        .item{
            padding 0 .2rem 0 .2rem
            line-height 2rem
            &:hover{
                background #eee
            }
        }
    }
</style>