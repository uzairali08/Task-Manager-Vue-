<script>
import { useTaskStore } from "@/store/TaskStore";
import HeaderComp from "./HeaderComp.vue";
import { computed, inject, onMounted } from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import usePagination from "@/composables/pagination";
export default {
  name: "AssignToMe",
  components: {
    HeaderComp,
    VPagination,
  },
  setup() {
    const taskStore = useTaskStore();

    const userInfo = JSON.parse(sessionStorage.getItem("user-info"));
    const userName = userInfo ? userInfo.name : null;

    const fetchAssignedTasks = async () => {
      const data = await taskStore.getAssignedTasks(userName);
      taskStore.tasks = data;
    };

    const updateStatus = async (taskId, newStatus) => {
      await taskStore.updateTaskStatus(taskId, newStatus);
    };

    onMounted(fetchAssignedTasks);

    const convertDeadlineToDate = (deadline) => {
      return new Date(deadline);
    };

    const assignedTasks = computed(() =>
      taskStore.tasks.map((task) => {
        // Convert the deadline string to a Date object before returning
        return {
          ...task,
          deadline: convertDeadlineToDate(task.deadline),
          last_updated: convertDeadlineToDate(task.last_updated),
        };
      })
    );

    // const page = ref(1);
    const perPage = 2;

    const {tasksForCurrentPage, updateHandler, totalPages} = usePagination(perPage, assignedTasks);

    const sName = inject("siteName")

    return {
      assignedTasks,
      updateStatus,
      tasksForCurrentPage,
      updateHandler,
      totalPages,
      sName
    };
  },
};
</script>

<template>
  <HeaderComp />
  <div class="container pt-5">
    <h1 v-font-style>Tasks assigned to me - {{ sName }}</h1>
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th v-table-header scope="col">Id</th>
            <th v-table-header scope="col">Title</th>
            <th v-table-header scope="col">Description</th>
            <th v-table-header scope="col">Status</th>
            <th v-table-header scope="col">Assigned By</th>
            <th v-table-header scope="col">Deadline</th>
            <th v-table-header scope="col">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasksForCurrentPage" :key="task.id">
            <th v-table-header>{{ task.id }}</th>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  id="statusDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-button
                >
                  {{ task.status }}
                </button>
                <div class="dropdown-menu" aria-labelledby="statusDropdown">
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="updateStatus(task.id, 'Not Started')"
                    >Not Started</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="updateStatus(task.id, 'In-Progress')"
                    >In-Progress</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="updateStatus(task.id, 'Completed')"
                    >Completed</a
                  >
                </div>
              </div>
            </td>
            <td>{{ task.assign_by }}</td>
            <td>{{ task.deadline.toLocaleString() }}</td>
            <td>{{ task.last_updated.toLocaleString() }}</td>
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
  </div>
</template>
