<template>
  <div id="app">
    <div class="bg"></div>
    <div class="windows">
      <div class="header">
        <TitleBar />
        <Menu />
        
        <Nav />
      </div>
      <div class="content">
        <Sidebar />
        <Viewer />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Viewer from "@/components/Viewer.vue";
import TitleBar from "@/components/TitleBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Menu from "@/components/Menu.vue";

import {
  onMounted,
  watch,
  defineComponent,
} from "@vue/composition-api";

import { infoStore } from "@/store/infoStore";

export default defineComponent({
  components: {
    TitleBar,
    Nav,
    Viewer,
    Footer,
    Sidebar,
    Menu
  },
  setup(props, { root }) {
    watch(Vue.$setting, (val) => {
      console.log("pull")
      if(val.repository) infoStore.pull()
    })
    onMounted(() => {
      //console.log(root)
    });
  }
});
</script>

<style lang="stylus" scoped>
@import "./css/variable.styl";

.windows {
  background #fff
  margin: 10vh auto;
  max-width: 75rem;
  width: 70vw;
  height: 70vh;
  box-shadow: 0px 0px 10px #000a;
  border: 1px solid windows-blue;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .header {
    width: 100%;
  }

  .content {
    flex: 1;
    overflow-y hidden
    display: flex;
    width: 100%;
    
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
@media screen and (max-width: 728px){
  .windows{
    {samll-device}
  }
}
</style>

