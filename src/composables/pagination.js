import { computed, ref } from "vue";

export default function usePagination(perPage, allTasks) {
  const page = ref(1); // Current page number, start with 1

  // Computed property to get tasks for the current page
  const tasksForCurrentPage = computed(() => {
    const startIndex = (page.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return allTasks.value.slice(startIndex, endIndex);
  });

  // Pagination update handler
  const updateHandler = (newPage) => {
    page.value = newPage;
  };

  const totalPages = computed(() => Math.ceil(allTasks.value.length / perPage));

  return { tasksForCurrentPage, updateHandler, totalPages };
}
