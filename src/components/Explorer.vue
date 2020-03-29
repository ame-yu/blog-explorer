<template>
  <div class="explorer">
    <table>
      <tr>
        <th>名称</th>
        <th>修改日期</th>
        <th>类型</th>
        <th>大小</th>
      </tr>

      <tr v-for="(it, index) in files" :key="index" @dblclick="push(it.fileName)">
        <td>{{ it.fileName }}</td>
        <td></td>
        <td>{{ it.fileType }}</td>
        <td></td>
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
      color: rgb(76, 96, 122);
      padding: 0.2rem 0rem 0.4rem 1rem;
      text-align: left;
      flex: 1;
      font-weight: 400;
      font-size: 13px;
      border-right: 1px solid #ececec;
      margin-bottom: 0.3rem;
      &:hover {
        background: hover-blue;
      }
    }

    td {
      flex: 1
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      padding: 0rem 0rem 0rem 1rem;
      width: 100%;
    }
  }
}
</style>