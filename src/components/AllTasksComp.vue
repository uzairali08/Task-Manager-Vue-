<script>
import { useTaskStore } from "@/store/TaskStore";
import { computed, inject, } from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import usePagination from "../composables/pagination"

export default {
  name: "AllTasks",
  components: { VPagination },
  setup() {
    const sName = inject("siteName");
    const taskStore = useTaskStore();
    // const tasks = ref(taskStore.tasks);

    taskStore.getAllTasks();

    // Function to convert deadline to Date object
    const convertDeadlineToDate = (deadline) => {
      return new Date(deadline);
    };

    // Computed property to get all tasks with deadlines converted to Date objects
    const allTasks = computed(() =>
      taskStore.tasks.map((task) => {
        // Convert the deadline string to a Date object before returning
        return { ...task, deadline: convertDeadlineToDate(task.deadline) };
      })
    );

    // Function to sort tasks in ascending order by title
    const ascendingOrder = () => {
      taskStore.tasks = taskStore.sortAscending;
      taskStore.tasks.value = taskStore.tasks;
    };

    // Function to sort tasks in descending order by title
    const descendingOrder = () => {
      taskStore.tasks = taskStore.sortDescending;
      taskStore.tasks.value = taskStore.tasks;
    };

    // const page = ref(1); // Current page number, start with 1
    const perPage = 3; // Tasks per page

    // Computed property to get tasks for the current page
    // const tasksForCurrentPage = computed(() => {
    //   const startIndex = (page.value - 1) * perPage;
    //   const endIndex = startIndex + perPage;
    //   return allTasks.value.slice(startIndex, endIndex);
    // });

    // Pagination update handler
    // const updateHandler = (newPage) => {
    //   page.value = newPage;
    // };

    // const totalPages = computed(() =>
    //   Math.ceil(allTasks.value.length / perPage)
    // );

    const {tasksForCurrentPage, updateHandler, totalPages} = usePagination(perPage, allTasks)

    return {
      allTasks,
      ascendingOrder,
      descendingOrder,
      tasksForCurrentPage,
      // page,
      perPage,
      updateHandler,
      totalPages,
      sName,
    };
  },
};
</script>

<template>
  <div class="container pt-5">
    <!-- <GlobalComp /> -->
    <div class="row">
      <div class="col-lg-10">
        <h1 v-font-style>All Tasks - {{ sName }}</h1>
      </div>
      <div class="col-lg-2">
        <div class="dropdown">
          <button
          v-button
            class="btn dropdown-toggle"
            type="button"
            id="sort"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by title
          </button>
          <div class="dropdown-menu" aria-labelledby="sort">
            <a class="dropdown-item" href="#" @click="ascendingOrder"
              >Ascending (A-Z)</a
            >
            <a class="dropdown-item" href="#" @click="descendingOrder"
              >Descending (Z-A)</a
            >
          </div>
        </div>
      </div>
    </div>
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
