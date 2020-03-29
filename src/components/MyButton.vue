<template>
  <button class="button is-primary" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { watch, defineComponent, computed } from "@vue/composition-api";
export default defineComponent({
  setup() {
    return {
      onClick:(cc: string)=>{
        console.log(cc)
      }
    };
  }
});
</script>

<style scoped>
button {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;
}
</style>
