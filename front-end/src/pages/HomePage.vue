<template>
    <h1>This is the Home Page</h1>
    <MealsList :meals="meals"/>
    <IngredientsList :ingredients="ingredients"/>
</template>

<script>

import MealsList from '../components/MealsList';
import IngredientsList from '../components/IngredientsList.vue';
export default {
    name: 'HomePage',
    props: ['ingredients'],
    components:{
        MealsList,
        IngredientsList,
    },
   
}
</script>