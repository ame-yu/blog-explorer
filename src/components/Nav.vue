<template>
  <div class="nav">
    <div id="nav-tool">
      <Icon iconName="arrow-left" @click.native="goback()" :class="{forwardable:backable}"/>
      <Icon iconName="arrow-right" @click.native="goforward()" :class="{forwardable}" />
      <Icon iconName="arrow-up" @click.native="upfolder()" :class="{upable}" />
    </div>
    <div class="address">
      <input type="text" :value="pwd"/>
      <Icon iconName="refresh"/>
    </div>
    
    <input type="text" id="search" :placeholder="folderName" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";
import Icon from "./Icon.vue";
import { routerStore } from "@/store/routerStore";

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    const forward = ref<Array<string>>([]);
    const folderName = computed(() => {
      const short = routerStore.pwd.split("/").slice(-1)[0];
      return `搜索"${short || "此电脑"}"`;
    });
    const backable = computed(()=>routerStore.getState().history.length)
    const forwardable = computed(() => forward.value.length > 0);
    const upable = computed(() => routerStore.pwd !== "/");
    return {
      pwd: computed(()=>routerStore.pwd),
      backable,
      folderName,
      forwardable,
      upable,
      goback: () => {
        forward.value.push(routerStore.pwd);
        routerStore.goBack();
      },
      goforward: () => {
        console.log(forward.value);
        if (forward.value.length > 0) {
          const path = forward.value.pop() || "/";
          routerStore.goto(path);
        }
      },
      upfolder: () => {
        const pwd = routerStore.pwd;
        if (pwd.split("/").length >= 2) {
          const newPath = pwd
            .split("/")
            .slice(0, -1)
            .join("/");
          routerStore.goto(newPath || "/");
        }
      }
    };
  }
});
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

.nav {
  margin-top: 0.2rem;
  display: flex;

  input {
    height: 1.2rem;
    border: 1px solid #ccc;
  }

  #nav-tool {
    width: 6.4rem;
    display: flex;

    .icon {
      flex: 1;
      max-width: 1.5rem;

      &.forwardable {
        opacity 1
        color #333
        &:hover {
          color: deep-blue;
        }
      }

      transition: 0.2s;
      font-size: 1.2rem;
      padding: 0.1rem;
      border: 1px solid #fff;
      opacity: 0.5;
      color: #666;

      &.upable {
        opacity: 1;
        
        &:hover {
          background: hover-blue;
          border: 1px solid rgb(204, 232, 255);
        }
      }
    }
  }

  .address {
    overflow hidden
    height 1.3rem
    flex: 2;
    display flex;
    border 1px solid #ccc
    input{
      padding 0
      flex: 1
      border 0
    }
    .icon{
      padding .2rem .1rem .2rem .2rem
      border 1px solid #fff0
      transition .3s
      color #777
      font-size 12px
      &:hover{
        background: hover-blue;
        border: 1px solid deep-blue;
      }
    }
  }

  #search {
    flex 1
    font-size: 12px;
    padding-left: 0.5rem;
    margin: 0rem 0.8rem;
    min-width: 3rem;
  }
}
</style>