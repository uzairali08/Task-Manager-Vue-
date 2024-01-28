<template>
  <div class="container p-5 border border-secondary col-lg-5 mt-5">
    <div class="text-center">
      <h1 v-font-style>{{ sName }}</h1>
      <img src="../assets/logo.png" alt="task manager logo" class="logo mb-3" />
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="email">Email address</label>
        <input
          v-focus
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Email Address"
          v-model="userEmail"
        />
      </div>
      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="userPassword"
        />
      </div>
      <p id="login" class="form-text text-muted text-center">
        Don't have an account. <router-link to="/sign-up">SignUp.</router-link>
      </p>
      <button type="submit" class="btn w-100" :disabled="btnDisable" v-button>
        Login
      </button>
      <p v-show="btnDisable" class="form-text text-muted text-center">Fill All the fields to activate button</p>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/AuthStore";
import { inject, onMounted, ref, watch } from "vue";
export default {
  name: "LoginComp",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const userEmail = ref("");
    const userPassword = ref("");

    onMounted(() => {
      if (sessionStorage.getItem("user-info")) {
        router.push({ name: "Home" });
      }
    });

    const handleSubmit = async () => {
      if (userEmail.value.length > 0 && userPassword.value.length > 0) {
        await authStore.checkUser(userEmail.value, userPassword.value);
        // userEmail.value = userPassword.value = "";

        if (authStore.validUser) {
          router.push({ name: "Home" });
        }
      }
    };

    const sName = inject("siteName");

    const btnDisable = ref("");

    const btnDisability = () => {
      if (userEmail.value.length > 0 && userPassword.value.length > 0) {
        btnDisable.value = false;
      } else {
        btnDisable.value = true;
      }
    };

    btnDisability();

    watch([userEmail, userPassword], () => btnDisability());

    return { handleSubmit, userEmail, userPassword, sName, btnDisable };
  },
};
</script>
