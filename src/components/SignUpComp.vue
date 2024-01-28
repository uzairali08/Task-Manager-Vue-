<template>
  <div class="container p-5 border border-secondary col-lg-5 mt-2">
    <div class="text-center">
      <h1 v-font-style>{{ sName }}</h1>
      <img src="../assets/logo.png" alt="task manager logo" class="logo mb-3" />
    </div>

    <!-- Sign Up Form -->
    <form @submit.prevent="handleSubmit">
      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input
          v-focus
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter Name"
          v-model="userName"
        />
      </div>
      <div class="form-group mb-3">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Email Address"
          v-model="userEmail"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
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
        Already have an account. <router-link to="/login">Login.</router-link>
      </p>
      <button
        type="submit"
        class="btn w-100"
        :disabled="btnDisable"
        v-button
      >
        SignUp
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
  name: "SignUpComp",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const userName = ref("");
    const userEmail = ref("");
    const userPassword = ref("");

    onMounted(() => {
      if (sessionStorage.getItem("user-info")) {
        router.push({ name: "Home" });
      }
    });

    const handleSubmit = () => {
      if (
        userName.value.length > 0 &&
        userEmail.value.length > 0 &&
        userPassword.value.length > 0
      ) {
        authStore.addUser({
          name: userName.value,
          email: userEmail.value,
          password: userPassword.value,
          id: Math.floor(Math.random() * 1000000),
        });
        userName.value = userEmail.value = userPassword.value = "";
        router.push({ name: "Login" });
      } else {
        console.error("Error occured!");
      }
    };

    const sName = inject("siteName");

    const btnDisable = ref("");

    const btnDisability = () => {
      if (
        userName.value.length > 0 &&
        userEmail.value.length > 0 &&
        userPassword.value.length > 0
      ) {
        btnDisable.value = false;
      } else {
        btnDisable.value = true;
      }
    };

    btnDisability();

    watch([userName, userEmail, userPassword], () => btnDisability())

    return {
      handleSubmit,
      userName,
      userEmail,
      userPassword,
      sName,
      btnDisable
    };
  },
};
</script>
