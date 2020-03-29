<template>
  <div class="title-bar">
    <div class="title">{{title || "此电脑"}}</div>
    <div class="btns">
      <div  class="btn"> <Icon iconName="min" /></div>
      <div  class="btn"> <Icon iconName="max"/></div>
      <div  class="btn"> <Icon iconName="close"/></div>
    </div>
  </div>
</template>


<script lang="ts">
import { routerStore } from "@/store/routerStore";
import Icon from "./Icon.vue";
import {
  onMounted,
  watch,
  defineComponent,
  computed
} from "@vue/composition-api";

export default defineComponent({
  name: "TitleBar",
  components: {
    Icon
  },
  setup(props, { root }) {
    return {
      title: computed(()=> routerStore.pwd.split("/").slice(-1)[0])
    }
  }
});
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';
title-bar-height=1.8rem
.title-bar {
  height: title-bar-height;
  background: windows-blue;
  display flex
  .title{
    flex 1
    line-height title-bar-height
    font-size 14px
    color white
    padding-left: 1rem
  }
  .btns {
    min-width: 8.7rem;
    display: flex;
    height 100%
    align-items center
    .btn {
      height 100%
      align-content center
      text-align: center;
      flex: 1;
      .icon{
        font-size 10px
        height 100%
        vertical-align middle
        color white
      }
      &:hover{
        background #fff2
      }
      &:last-child:hover{
        background rgb(232,17,35)
      }
    }
    
  }
}
</style>