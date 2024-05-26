import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axiosInstance from "./axios-api";

const app = createApp(App);

app.config.globalProperties.$api = axiosInstance;

app.use(store).use(router);

app.mount("#app");
