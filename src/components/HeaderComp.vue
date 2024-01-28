<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HeaderComp",
  setup() {
    const router = useRouter();

    const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    const name = userInfo ? userInfo.name : "";

    const logout = () => {
      sessionStorage.removeItem("user-info");
      router.push({ name: "Login" });
    };

    onMounted(() => {
      if (!sessionStorage.getItem("user-info")) {
        router.push({ name: "Login" });
      }
    });

    return {
      name,
      logout,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/">
        <a class="navbar-brand" v-logo-style>
          <!-- <img src="../assets/logo.png" width="60px" /> -->
          {{ $translate("urdu.TaskManager") }}
        </a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link"
              ><router-link to="/">{{
                $translate("urdu.AllTasks")
              }}</router-link></a
            >
            <!-- <a class="nav-link" href="#"
              >All Tasks
              <span class="sr-only">(current)</span>
            </a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Assign Task</a> -->
            <a class="nav-link"
              ><router-link to="/assign-task">{{
                $translate("urdu.AssignTask")
              }}</router-link></a
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $translate("urdu.MyTasks") }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="nav-link"
                ><router-link to="/defined-by-me">{{
                  $translate("urdu.DefinedByMe")
                }}</router-link></a
              >
              <a class="nav-link"
                ><router-link to="/assigned-to-me">{{
                  $translate("urdu.AssignedToMe")
                }}</router-link></a
              >
            </div>
          </li>
        </ul>
        <!-- Custom Event -->
        <!-- <div class="d-flex justify-content-center mx-auto">
          <button @click="$emit('someEvent')">E1</button>
          <button @click="$emit('counterEvent', 1)">E2</button>
          <button @click="$emit('decreaseEvent')">E3</button>
        </div> -->
        <!-- Custom Event -->
        <div class="d-flex justify-content-end ms-auto">
          <span class="navbar-text mx-2">
            <u v-table-header> {{ name }} </u>
            <b> : {{ $translate("urdu.SignedIn") }} </b>
            </span>
          <button v-button class="btn my-2 my-sm-0" @click="logout">
            {{ $translate("urdu.Logout") }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  color: rgba(0, 0, 0, 0.808);
  text-decoration: none;
}
</style>
