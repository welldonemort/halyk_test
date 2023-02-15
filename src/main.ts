import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import axios from "axios";
import { useDataStore } from "@/stores/data";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const store = useDataStore();

axios.interceptors.request.use((config) => {
  if (store.accessToken) {
    config.headers["Authorization"] = `Bearer ${store.accessToken}`;
  }
  return config;
});

app.mount("#app");
