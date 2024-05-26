import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userType: "",
  },
  getters: {},
  mutations: {
    setUserType(state, userType) {
      state.userType = userType;
    },
    reloadTitle(state, payload) {
      document.title = `Schoolsoft | ${payload.title}`;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["userType"],
    }),
  ],
});
