<template>
  <div id="app">
    <div class="bg"></div>
    <div class="windows">
      <div class="header">
        <TitleBar />
        <div class="menu"></div>
        <Nav />
      </div>

      <div class="content">
        <div class="sidebar">
          <div class="warpper">
            <FolderItem :dir="dirData" />
          </div>
        </div>
        <Viewer />
      </div>
      
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import FolderItem from "@/components/FolderItem.vue";
import Viewer from "@/components/Viewer.vue";
import TitleBar from "@/components/TitleBar.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

import {
  onMounted,
  watch,
  defineComponent,
  computed
} from "@vue/composition-api";

import { infoStore } from "@/store/infoStore";
import { grepFolder } from "@/utils/githubGraphQL";

export default defineComponent({
  components: {
    FolderItem,
    TitleBar,
    Nav,
    Viewer,
    Footer
  },
  setup(props, { root }) {
    watch(Vue.$setting, (val) => {
      if(val.repository) infoStore.pull()
    })
    const info = infoStore.getState();
    onMounted(() => {
      //console.log(root)
    });
    const filter = computed(() => grepFolder(info.tree));
    const dirData = computed(() => filter.value);
    return {
      dirData
    };
  }
});
</script>

<style lang="stylus" scoped>
@import "./css/variable.styl";

.windows {
  background #fff
  margin: 10vh auto;
  max-width: 80rem;
  width: 60vw;
  height: 70vh;
  box-shadow: 0px 0px 10px #000a;
  border: 1px solid windows-blue;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .header {
    width: 100%;
    .menu {
      height: 1.6rem;
      background: darken(windows-blue, 5);
      border-bottom: 1px solid #ccc;
    }
  }

  .content {
    flex: 1;
    overflow-y hidden
    display: flex;
    width: 100%;
    .sidebar {
      max-width 15rem
      min-width 12rem
      flex 1
      overflow: hidden;
      border-right: 1px solid #efefef;
      margin-top: 0.5rem;

      .warpper {
        user-select: none;
        width: 30rem;
      }
    }
  }

  .footer {
    line-height: 1.4rem;
    width: 100%;
    font-size: 13px;
  }

  
}

samll-device = @block{
    .header .menu{
      display none
    }
    
    box-sizing border-box
    position fixed
    top 0
    left 0
    margin 0
    padding 0
    width 100%
    height 100%
    overflow hidden
}
@media screen and (max-width: 1024px) and (max-height: 768px){
  .windows{
    {samll-device}
  }
}

@media screen and (max-width: 500px){
  .windows{
    {samll-device}
  }
  .sidebar{
    width 10rem
    position fixed
    top calc(100vh - 3rem)
    background hover-blue
    transition .2s
    height 90vh
    &:hover{
      top 5rem
    }
  }
}
</style>

