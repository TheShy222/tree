<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      title: "动态表单配置",
    };
  },
});
</script>
<style lang="scss" scoped></style>
