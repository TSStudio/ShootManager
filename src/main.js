import { createApp } from "vue";

import App from "./App.vue";

import { ElLoading } from "element-plus";

import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import "./css/style.css";

const app = createApp(App);
app.mount("#app");
