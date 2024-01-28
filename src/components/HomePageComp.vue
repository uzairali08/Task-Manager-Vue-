<script>
import HeaderComp from './HeaderComp.vue';
import AllTasksComp from './AllTasksComp.vue';
export default {
    name: "HomePageComp",
    components:{
        HeaderComp,
        AllTasksComp,
    }
}

</script>

<template>
    <div>
        <HeaderComp />
        <AllTasksComp />
    </div>
</template>