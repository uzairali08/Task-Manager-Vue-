import { defineStore } from "pinia";
import axios from "axios";
import { inject } from "vue";
// import { reactive } from "vue";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    // reactive([]),
    url: inject("api_url")
  }),
  getters: {
    sortAscending: (state) => {
      return [...state.tasks].sort((a, b) => a.title.localeCompare(b.title));
    },
    sortDescending: (state) => {
      return [...state.tasks].sort((a, b) => b.title.localeCompare(a.title));
    },
  },
  actions: {
    async getAllTasks() {
      try {
        // const res = await fetch("http://localhost:3000/tasks");
        const res = await axios.get(this.url+"/tasks");
        // const res = await axios.get("http://localhost:3000/tasks");
        // const res = await axios.get("http://192.168.18.71:3000/tasks");
        if (res.error) {
          console.warn("Error: ", res.error);
        }
        // const data = await res.json();
        const data = res.data;
        this.tasks = data;
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
    async addTask(task) {
      try {
        this.tasks.push(task);
        // const res = await fetch("http://localhost:3000/tasks", {
        //   method: "POST",
        //   body: JSON.stringify(task),
        //   headers: { "Content-type": "application/json" },
        // });
        const res = await axios.post(this.url+"/tasks", task, {
        // const res = await axios.post("http://192.168.18.71:3000/tasks", task, {
        // const res = await axios.post("http://localhost:3000/tasks", task, {
          headers: { "Content-type": "application/json" },
        });

        console.warn("Task Added:", res);
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
    async getUserTasks(name) {
      try {
        // const res = await fetch("http://localhost:3000/tasks?assign_by=" + name);
        const res = await axios.get(
          this.url+"/tasks?assign_by=" + name
          // "http://localhost:3000/tasks?assign_by=" + name
          // "http://192.168.18.71:3000/tasks?assign_by=" + name
        );
        // const data = await res.json();
        const data = res.data;
        return data;
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
    async deleteTask(id) {
      try {
        this.tasks = this.tasks.filter((t) => {
          return t.id !== id;
        });
        // const res = await fetch("http://localhost:3000/tasks/" + id, {
        //   method: "DELETE",
        // });
        const res = await axios.delete(this.url+"/tasks/" + id);
        // const res = await axios.delete("http://localhost:3000/tasks/" + id);
        // const res = await axios.delete("http://192.168.18.71:3000/tasks/" + id);
        console.warn("Deleted Task: " + res);
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
    async updateTask(taskId, updatedTask) {
      try {
        // Find the index of the task with the given ID in the tasks array
        const taskIndex = this.tasks.findIndex(
          (task) => task.id === parseInt(taskId)
        );
        if (taskIndex === -1) {
          console.warn("Task not found.");
          return null;
        }
        // Update the task in the local tasks array
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        // Update the task on the server
        // const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        //   method: "PATCH",
        //   body: JSON.stringify(updatedTask),
        //   headers: { "Content-type": "application/json" },
        // });
        const res = await axios.patch(
          this.url+`/tasks/${taskId}`,
          // `http://localhost:3000/tasks/${taskId}`,
          // `http://192.168.18.71:3000/tasks/${taskId}`,
          updatedTask,
          {
            headers: { "Content-type": "application/json" },
          }
        );
        console.warn("Updated Task:", res);
        // if (!res.ok) {
        //   console.warn("Error updating task on the server.");
        //   return null;
        // }
        return this.tasks[taskIndex];
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
    async getAssignedTasks(name) {
      try {
        // const res = await fetch(
        //   "http://localhost:3000/tasks?assigned_user=" + name
        // );
        const res = await axios.get(
          this.url+"/tasks?assigned_user=" + name
          // "http://192.168.18.71:3000/tasks?assigned_user=" + name
          // "http://localhost:3000/tasks?assigned_user=" + name
        );
        // const data = await res.json();
        const data = res.data;
        return data;
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
    async updateTaskStatus(taskId, newStatus) {
      try {
        const taskIndex = this.tasks.findIndex(
          (task) => task.id === parseInt(taskId)
        );
        if (taskIndex === -1) {
          console.warn("Task not found.");
          return null;
        }
        // Prepare the data to be sent in the PATCH request
        const patchData = {
          status: newStatus,
          last_updated: new Date().toISOString(),
        };
        // Make the PATCH request
        // const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        //   method: "PATCH",
        //   body: JSON.stringify(patchData),
        //   headers: { "Content-type": "application/json" },
        // });
        const res = await axios.patch(
          this.url+`/tasks/${taskId}`,
          // `http://localhost:3000/tasks/${taskId}`,
          // `http://192.168.18.71:3000/tasks/${taskId}`,
          patchData,
          {
            headers: { "Content-type": "application/json" },
          }
        );
        console.warn(res);
        // if (res.status != 200) {
        //   console.warn("Error updating task on the server.");
        //   return null;
        // }
        // if (!res.ok) {
        //   console.warn("Error updating task on the server.");
        //   return null;
        // }
        // Update the local tasks array
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...patchData };
        return this.tasks[taskIndex];
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
