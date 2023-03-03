<template>
  <el-container>
    <!-- 左侧区域 -->
    <el-aside style="width: 200px;">
      <div class="g-title">
      </div>
      <el-menu
      background-color="#262424"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="/choose1-1">选项1-1</el-menu-item>
          <el-menu-item index="/choose1-2">选项1-2</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航二</span>
        </template>
          <el-menu-item index="/choose2-1">动态表单使用</el-menu-item>
          <el-menu-item index="/choose2-2">动态表单配置</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
          <div class="g-header-r">
            <h3>用户名：{{ user.name }}</h3>
            <el-button size="small" icon="el-icon-switch-button" type="primary" @click="exit">退出</el-button>
          </div>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <!-- 子路由输出 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      
    };
  },
  computed: {
    user() {
      return this.$store.getters['loginAccount']
    },
  },
  methods: {
    exit() {
      localStorage.removeItem('loginAccount')
      this.$router.replace({ path: '/login' })
    }
  }
});
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100vh;

  .el-aside {
    background-color: #262424;
    color: white;
    transition: 0.6s;

    .g-title {
      display: flex;
      margin: 20px;

      h3 {
        margin-left: 20px;
      }
    }
    .el-menu {
      border-right: 0;
    }
  }

  .el-container {
    .el-header {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px;
      background-color: skyblue;
      height: 60px;
      .g-header-r {
        display: flex;
        align-items: center;
        h3{
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
