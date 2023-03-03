<template>
    <div>{{ title }}</div>
      </template>
      
      <script lang="ts">
      import Vue from "vue";
      
      export default Vue.extend({
        name: "Home",
        data() {
          return {
            title: "选项1-2",
          };
        },
      });
      </script>
      <style lang="scss" scoped>
      </style>
      