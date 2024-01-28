import "bootstrap/dist/css/bootstrap.css";
import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routes";
import MyPlugin from "./plugins/MyPlugin";

const app = createApp(App);
app.use(createPinia());
app.use(router);

//Install Plugin
// app.use(MyPlugin);

//Install Plugin - Passing Customizable Options to Plugins
app.use(MyPlugin, {
  fontSize: "24pt",
  fontFamily: "comic sans ms",
  color: "#4B0082",
  fontWeight: "bold",
  urdu: {
    TaskManager: "ٹاسک مینیجر ایپ",
    AllTasks: "تمام کام",
    AssignTask: "کام تفویض کریں",
    MyTasks: "میرے کام",
    DefinedByMe: "میری طرف سے بیان کیا گیا ہے۔",
    AssignedToMe: "مجھے تفویض کیا",
    SignedIn: "صارف",
    Logout: "لاگ آوٹ",
  },
  logoFontFamily: "calibri",
});

app.directive("button", {
  mounted(el) {
    el.style.backgroundColor = "#4B0082";
    el.style.color = "#FFF";
    el.style.padding = "5px 8px";
  },
});

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.directive("table-header", {
  mounted(el) {
    el.style.fontFamily = "comic sans ms";
    el.style.color = "#4B0082";
    el.style.fontWeight = "bold";
    el.style.fontSize = "14pt";
  },
});

app.provide("api_url", "http://192.168.18.71:3000");

app.mount("#app");
