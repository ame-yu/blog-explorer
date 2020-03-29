<template>
  <ul class="folder">
    <li>
      <Icon iconName="arrow-down" @click.native="toggle()" :class="{hide, final}" />
      <span class="folder-icon" @click="go(dir.path)">
        <img src="../assets/folder.png" />
      </span>
      <span class="text" @click="go(dir.path)">{{ shortName(dir.path) || "我的电脑" }}</span>
    </li>
    <FolderItem v-for="(it,index) in dir.file" :key="index" :dir="it" :class="{hide}" />
  </ul>
</template>


<script lang="ts">
import {dirObj} from "@/store/type"
import {routerStore} from "@/store/routerStore"
import Icon from "./Icon.vue";
import { defineComponent, ref, computed } from "@vue/composition-api";
import { shortName } from "@/utils/githubGraphQL";
interface Props {
  dir: dirObj;
}

export default defineComponent({
  name: "FolderItem",
  props: {
    dir: {}
  },
  components: {
    Icon
  },
  setup(props: Props) {
    const hide = ref(true);
    function go(path: string){
        routerStore.goto(path)
    }
    const final = computed(() => props.dir.file.length === 0);
    return {
      go,
      shortName,
      hide,
      final,
      toggle: () => {
        hide.value = !hide.value;
      }
    };
  }
});
</script>


<style lang="stylus" scoped>
@import '../css/variable.styl';
li {
  list-style: none;
  height: 1.4rem;
  line-height: 1.5rem;
  box-sizing: border-box;
  width: 99%;
  font-size: 13px;
  padding-left: 2rem;
  
  span {
    cursor: pointer;
  }

  .icon {
    opacity: 0;
    padding-left: 0.2rem;
    font-size: 10px;
    transition: 0.2s;

    &:hover {
      color: rgb(72,205,249)
    }

    &.hide {
      color: rgb(191, 191, 191);
      transform: rotateZ(-90deg);
    }
    &.final{
      opacity 0!important
    }
  }

  span.folder-icon {
    min-width: 1.3rem;
    display: inline-block;
  }

  .folder-icon img {
    vertical-align: top ;
  }

  &:hover {
    background: rgb(229, 243, 255);
  }

  &:first-child {
    padding-left: 0;
  }
}

ul {
  padding-left: 0rem;

  ul .icon {
    margin-left: 1rem;
  }

  ul ul .icon {
    margin-left: 2rem;
  }

  &:hover .icon {
    opacity: 1;
  }
}

.folder.hide {
  height: 0;
  overflow: hidden;
}

/**
 * repeat string num times
 * @param str:string delimiter:string num:number
 * @return buf:string
 */
times(str, delimiter, num) {
  buf = '';

  for num in (1 .. num) {
    buf = buf + str + delimiter;
  }

  buf;
}

total = 10;
for num in (1 .. total) {
  {times('ul', ' ', num)}.icon{
    margin-left: unit(num * .6 - .6, 'rem');
  }
}
</style>