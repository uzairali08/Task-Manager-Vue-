import { createRouter, createWebHistory } from "vue-router";
// import SignUpComp from "./components/SignUpComp.vue";
// import LoginComp from "./components/LoginComp.vue";
// import HomePageComp from "./components/HomePageComp.vue";
// import AssignTask from "./components/AssignTasksComp.vue";
// import DefinedByMe from "./components/DefinedByMe.vue";
// import AssignToMe from "./components/AssignToMe.vue";
// import PageNotFound from "./components/PageNotFound.vue";

const routes = [
  {
    name: "SignUp",
    path: "/sign-up",
    component: () => import("./components/SignUpComp.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("./components/LoginComp.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("./components/HomePageComp.vue"),
  },
  {
    name: "AssignTask",
    path: "/assign-task",
    component: () => import("./components/AssignTasksComp.vue"),
  },
  {
    name: "DefinedByMe",
    path: "/defined-by-me",
    component: () => import("./components/DefinedByMe.vue"),
  },
  {
    name: "EditTask",
    path: "/edit-task/:id",
    component: () => import("./components/AssignTasksComp.vue"),
  },
  {
    name: "AssignedToMe",
    path: "/assigned-to-me",
    component: () => import("./components/AssignToMe.vue"),
  },
  {
    name: "PageNotFound",
    path: "/:pathMatch(.*)*",
    component: () => import("./components/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
