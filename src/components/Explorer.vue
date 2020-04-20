<template>
  <div class="explorer">
    <table>
      <tr>
        <th>名称</th>
        <th>类型</th>
        <th>修改日期</th>
        <th>大小</th>
      </tr>

      <tr v-for="(it, index) in files" :key="index" @dblclick="push(it.fileName)">
        <td>{{ it.fileName }}</td>
        <td>{{ it.fileType }}</td>
        <td>{{ it.lastEditDate?it.lastEditDate.split("T")[0]:""}}</td>
        <td>{{ it.size?`${it.size}B`:"" }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { infoStore } from "@/store/infoStore";
import { routerStore } from "@/store/routerStore";
import { pwdManifest } from "@/utils/fileUtils";
import { watch, defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const files = computed(() => {
      const manifest = infoStore.getState().manifest;
      const path = routerStore.pwd;
      return pwdManifest(manifest, path);
    });
    return {
      files,
      push: (fileName: string) => {
        routerStore.push(fileName);
      }
    };
  }
});
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

.explorer {
  padding-top: 0.4rem;
  width: 100%;
}

col = @block{
  flex: 1
  color rgb(109,109,123)
  &:first-child{
    color #111
  }
  &:nth-child(2){
    max-width 6rem
  }
  
  &:nth-child(3){
    max-width 7rem
  }
  &:nth-child(4){
    max-width 4rem
  }
}
table {
  height: 100%;
  user-select: none;
  width: 100%;

  tr {
    
    display flex
    &:nth-child(n + 2):hover {
        background: hover-blue;
    }
    display: flex;
    th {
      {col}
      color: rgb(76, 96, 122);
      padding: 0.2rem 0rem 0.4rem 1rem;
      text-align: left;
      font-weight: 400;
      font-size: 13px;
      border-right: 1px solid #ececec;
      margin-bottom: 0.3rem;
      &:hover {
        background: hover-blue;
      }
    }

    td {
      {col}
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      padding: 0rem 0rem 0rem 1rem;
      width: 100%;
      font-size 15px
    }
  }
}
</style>