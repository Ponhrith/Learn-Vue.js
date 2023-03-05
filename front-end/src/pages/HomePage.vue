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
    components:{
        MealsList,
        IngredientsList,
    },
    data(){
    return{
        ingredients: [
            { name: 'Honey', amount: 3, units: 'tablespoons' },
            { name: 'Self-Rising Flour', amount: 10, units: 'cups'},
        ],
        meals: [],
    }
    }
}
</script>