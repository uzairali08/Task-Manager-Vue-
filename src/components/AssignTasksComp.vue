<script>
import { useTaskStore } from "@/store/TaskStore";
import HeaderComp from "./HeaderComp.vue";
import { inject, onMounted, ref, watch } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import { useRoute } from "vue-router";
export default {
  name: "AssignTask",
  components: {
    HeaderComp,
  },
  emits: ["decreaseEvent"],
  setup(props, { emit }) {
    emit("decreaseEvent");
    const taskStore = useTaskStore();
    const authStore = useAuthStore();
    const userNames = ref([]);

    const loadUsers = async () => {
      const names = await authStore.fetchUsers();
      userNames.value = names;
    };

    onMounted(loadUsers);

    const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    const name = userInfo.name;

    // for new task
    const title = ref("");
    const description = ref("");
    const starting = ref("");
    const ending = ref("");
    const assign_to = ref("");

    // for editing
    const route = useRoute();
    const isEditing = route.path.includes("edit-task");
    // let taskId;
    // let task;
    const taskId = route.params.id;

    if (isEditing) {
      // const taskId = route.params.id;
      console.warn(taskId);
      console.warn(taskStore.tasks);
      const task = taskStore.tasks.find((task) => task.id === parseInt(taskId));
      console.warn(task);
      if (task) {
        title.value = task.title;
        description.value = task.description;
        starting.value = task.startdate;
        ending.value = task.deadline;
        assign_to.value = task.assigned_user;
      }
    }

    async function handleSubmitForEdit() {
      const updatedTask = {
        title: title.value,
        description: description.value,
        startdate: starting.value,
        deadline: ending.value,
        assigned_user: assign_to.value,
        assign_by: name,
      };

      try {
        await taskStore.updateTask(taskId, updatedTask);
        alert("Task Updated Successfully");
        window.location.href = "/defined-by-me";
      } catch (error) {
        console.warn("Error : ", error);
      }
    }

    async function handleSubmitForNewTask() {
      const selectedStart = new Date(starting.value);
      const selectedDeadline = new Date(ending.value);
      const currentDateTime = new Date();

      if (
        selectedStart < currentDateTime ||
        selectedDeadline < currentDateTime
      ) {
        alert("Start Time and Deadline cannot be set to past dates and times.");
        return; // Stop the function execution, preventing the addition of a task with past dates.
      }
      if (
        title.value !== "" &&
        description.value !== "" &&
        starting.value !== "" &&
        ending.value !== "" &&
        assign_to.value !== ""
      ) {
        taskStore.addTask({
          title: title.value,
          description: description.value,
          startdate: starting.value,
          deadline: ending.value,
          assigned_user: assign_to.value,
          assign_by: name,
          status: "Not Started",
          id: Math.floor(Math.random() * 10000),
        });
        alert("Data Stored Successfully");
        title.value =
          description.value =
          starting.value =
          ending.value =
          assign_to.value =
            "";
      } else {
        alert("Error");
      }
    }

    const handleSubmit = isEditing
      ? handleSubmitForEdit
      : handleSubmitForNewTask;

    const blockTitle = isEditing ? "Edit" : "Assign";

    const callback = () => {
      alert("Custom Event Called");
    };

    const count = ref(0);
    const counter = (v) => {
      count.value += v;
    };

    const decreaseCounter = () => {
      count.value -= 1;
    };

    const sName = inject("siteName");

    const btnDisable = ref("");

    const btnDisability = () => {
      if (
        title.value !== "" &&
        description.value !== "" &&
        starting.value !== "" &&
        ending.value !== "" &&
        assign_to.value !== ""
      ) {
        btnDisable.value = false;
      } else {
        btnDisable.value = true;
      }
    };

    btnDisability();

    watch([title, description, starting, ending, assign_to], () => btnDisability())

    return {
      handleSubmit,
      title,
      description,
      starting,
      ending,
      assign_to,
      userNames,
      blockTitle,
      callback,
      counter,
      count,
      decreaseCounter,
      sName,
      btnDisable,
    };
  },
};
</script>

<template>
  <!-- <HeaderComp @some-event="callback" @counter-event="counter" @decrease-event="decreaseCounter" /> -->
  <HeaderComp />
  <!-- <h2>Count: {{ count }}</h2> -->
  <div class="container p-5 border border-secondary col-lg-5 my-5">
    <h2 v-font-style>{{ blockTitle }} Task - {{ sName }}</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation">
      <div class="form-group mb-3">
        <label for="title" v-table-header>Title*</label>
        <input
          v-focus
          type="text"
          class="form-control"
          id="title"
          placeholder="Enter Task Title"
          v-model="title"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="description" v-table-header>Description*</label>
        <textarea
          class="form-control"
          placeholder="Write the task description..."
          rows="4"
          id="description"
          v-model="description"
          required
        ></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="start" v-table-header>Start Time*</label>
        <input
          type="datetime-local"
          class="form-control"
          id="start"
          v-model="starting"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="deadline" v-table-header>Deadline*</label>
        <input
          type="datetime-local"
          class="form-control"
          id="deadline"
          v-model="ending"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="assign_user" v-table-header>Assign User</label>
        <select
          class="form-control"
          id="assign_user"
          v-model="assign_to"
          required
        >
          <option v-for="name in userNames" :key="name">{{ name }}</option>
        </select>
      </div>

      <button class="btn w-100" v-button :disabled="btnDisable">
        Save Task
      </button>
      <p v-show="btnDisable" class="form-text text-muted text-center">Fill All the fields to activate button</p>
    </form>
  </div>
</template>
