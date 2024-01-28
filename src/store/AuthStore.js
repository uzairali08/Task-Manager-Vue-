import { defineStore } from "pinia";
import axios from "axios";
import { inject } from "vue";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    users: [],
    validUser: false,
    url: inject("api_url"),
  }),
  getters: {},
  actions: {
    async addUser(user) {
      try {
        this.users.push(user);
        // console.warn(user.name, user.email, user.password, user.id);

        const res = await axios.post(this.url+"/users", user, {
        // const res = await axios.post("http://192.168.18.71:3000/users", user, {
        // const res = await axios.post("http://localhost:3000/users", user, {
          headers: { "Content-Type": "application/json" },
        });

        // const res = await fetch("http://localhost:3000/users", {
        //   method: "POST",
        //   body: JSON.stringify(user),
        //   headers: { "Content-Type": "application/json" },
        // });

        console.log("User added successfully:", res);
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response headers:", error.response.headers);
          console.error("Error response status:", error.response.status);
        } else if (error.request) {
          console.error("Error response request:", error.request);
        } else {
          console.log("Error:", error);
        }
      }
    },
    async checkUser(email, password) {
      // const res = await fetch("http://localhost:3000/users");
      // const userData = await res.json();
      try {
        const res = await axios.get(this.url+"/users");
        // const res = await axios.get("http://localhost:3000/users");
        // const res = await axios.get("http://192.168.18.71:3000/users");
        const userData = res.data;

        const user = userData.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          this.validUser = true;
          console.warn("This user is valid");
          const sessionStorage = window.sessionStorage;
          // sessionStorage.setItem('user-info', [user.name, user.email, user.id]);
          sessionStorage.setItem(
            "user-info",
            JSON.stringify({ name: user.name, email: user.email, id: user.id })
          );
        } else {
          this.validUser = false;
          console.warn("The user does not exist");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response headers:", error.response.headers);
          console.error("Error response status:", error.response.status);
        } else if (error.request) {
          console.error("Error response request:", error.request);
        } else {
          console.log("Error:", error);
        }
      }
    },
    async fetchUsers() {
      try {
        // const res = await fetch("http://localhost:3000/users");
        // const userData = await res.json();
        const res = await axios.get(this.url+"/users");
        // const res = await axios.get("http://192.168.18.71:3000/users");
        // const res = await axios.get("http://localhost:3000/users");
        const userData = res.data;
        this.$state.users = userData;
        return userData.map((user) => user.name);
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response headers:", error.response.headers);
          console.error("Error response status:", error.response.status);
        } else if (error.request) {
          console.error("Error response request:", error.request);
        } else {
          console.log("Error:", error);
        }
      }
    },
  },
});
