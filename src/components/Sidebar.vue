<template>
  <div class="sidebar">
    <div class="warpper">
      <FolderItem :dir="dirData" />
    </div>
  </div>
</template>

<script>
import FolderItem from "@/components/FolderItem.vue";
import { grepFolder } from "@/utils/githubGraphQL";
import { infoStore } from "@/store/infoStore";
import {
  onMounted,
  watch,
  defineComponent,
  computed
} from "@vue/composition-api";
export default defineComponent({
  components: {
    FolderItem
  },
  setup() {
    const info = infoStore.getState();

    const filter = computed(() => grepFolder(info.tree));
    const dirData = computed(() => filter.value);
    return { dirData };
  }
});
</script>

<style lang="stylus" scoped>
.sidebar {
  max-width: 15rem;
  min-width: 12rem;
  padding-right: 2px;
  flex: 1;
  overflow: hidden;
  border-right: 1px solid #efefef;
  margin-top: 0.5rem;

  .warpper {
    user-select: none;
    width: 30rem;
  }
}

@media screen and (max-width: 500px) {
  .sidebar {
    display none
  }
}
</style>