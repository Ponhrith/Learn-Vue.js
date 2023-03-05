<template>
    <h1>This is the Home Page</h1>
    <MealsList />
</template>

<script>
// import MealsListVue from '@/components/MealsList.vue'
import MealsList from '../components/MealsList';
export default {
    name: 'HomePage',
    components:{
        MealsList,
    }
}
</script>