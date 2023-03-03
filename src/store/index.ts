import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginAccount: null,
  },
  mutations: {
    SAVE(state, loginAccount) {
      state.loginAccount = loginAccount; // 保存内存
      localStorage.setItem("loginAccount", JSON.stringify(loginAccount)) // 持久化存储
    },
  },
  actions: {
    save({ commit }, loginAccount) {
      commit("SAVE", loginAccount);
    },
  },
  getters: {
    loginAccount: (state) => {
      if (state.loginAccount) {
        return state.loginAccount;
      } else {
        let loginAccount= localStorage.getItem("loginAccount");
        return JSON.parse(String(loginAccount))
      }
    },
  },
});
