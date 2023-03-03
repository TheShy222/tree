<template>
  <div id="g-container">
    <div class="g-wrapper">
      <el-form class="g-login" :model="user">
        <el-form-item prop="name">
          <el-input placeholder="请输入用户名" v-model="user.name">
            <template #prefix>
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="user.password"
            show-password
          >
            <template #prefix>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-row class="bottom">
          <el-button type="primary" @click="bindLogin">登录</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Message } from "element-ui";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    bindLogin() {
      if (this.user.password === "123456") {
        //保存登录状态
        this.$store.dispatch("save", this.user)
        //跳转主界面
        this.$router.push({ path: "/home" });
        Message({
          message: "登录成功!",
          type: "success",
        });
      } else {
        Message({
          message: "用户名或密码错误!",
          type: "error",
        });
      }
    },
  },
});
</script>
<style lang="scss" scoped>
#g-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(#141e30, #243b55);

  .g-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    background: linear-gradient(#141e30, #243b55);
    text-align: center;

    h2 {
      color: #fff;
      margin-bottom: 20px;
    }

    .g-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      padding: 40px;
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);

      .el-input {
        width: 300px;
      }
    }
  }
}
</style>
