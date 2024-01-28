<script>
import { useTaskStore } from "@/store/TaskStore";
import HeaderComp from "./HeaderComp.vue";
import { computed, inject, onMounted, ref } from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import usePagination from "@/composables/pagination";
export default {
  name: "DefinedByMe",
  components: {
    HeaderComp,
    VPagination
  },
  setup() {
    const taskStore = useTaskStore();
    // const tasks = ref(taskStore.tasks);
    const currentTaskId = ref(null);

    const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    const userName = userInfo.name;

    // taskStore.getUserTasks(userName);
    const fetchUserTasks = async () => {
      const data = await taskStore.getUserTasks(userName);
      //   tasks.value = data;
      taskStore.tasks = data;
    };

    // fetchUserTasks();
    onMounted(fetchUserTasks);

    const convertDeadlineToDate = (deadline) => {
      return new Date(deadline);
    };

    const userTasks = computed(() =>
        taskStore.tasks.map((task) => {
          // Convert the deadline string to a Date object before returning
          return { ...task, deadline: convertDeadlineToDate(task.deadline) };
        })
      )

    // const page = ref(1);
    const perPage = 3;  

    const {tasksForCurrentPage, updateHandler, totalPages} = usePagination(perPage, userTasks);

    const sName = inject("siteName")

    return {
      userTasks,
      taskStore,
      currentTaskId,
      tasksForCurrentPage,
      updateHandler,
      totalPages,
      sName,
    };
  },
};
</script>
<template>
  <HeaderComp />
  <div class="container pt-5">
    <h1 v-font-style>Tasks defined by me - {{ sName }}</h1>
    <div class="table-responsive">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th v-table-header scope="col">Id</th>
          <th v-table-header scope="col">Title</th>
          <th v-table-header scope="col">Description</th>
          <th v-table-header scope="col">Status</th>
          <th v-table-header scope="col">Assigned User</th>
          <th v-table-header scope="col">Deadline</th>
          <th v-table-header scope="col">Operations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasksForCurrentPage" :key="task.id">
          <th v-table-header>{{ task.id }}</th>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.assigned_user }}</td>
          <td>{{ task.deadline.toLocaleString() }}</td>
          <td>
            <button class="btn mx-1" v-button>
              <router-link :to="`/edit-task/${task.id}`">Edit</router-link>
            </button>
            <!-- <button
              class="btn btn-danger mx-1"
              @click="taskStore.deleteTask(task.id)"
            >
              Delete
            </button> -->
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#deleteModal"
              @click="currentTaskId=task.id"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <div class="d-flex justify-content-center">
      <v-pagination
        v-model="page"
        :pages="totalPages"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
      />
    </div>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-font-style>Delete Task</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Are you sure you want to delete this task?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn"
              data-dismiss="modal"
              v-button
            >
              No
            </button>
            <button class="btn btn-danger" @click="taskStore.deleteTask(currentTaskId)" data-dismiss="modal">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: rgba(255, 255, 255, 0.808);
  text-decoration: none;
}
</style>
