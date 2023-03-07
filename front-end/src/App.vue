<template>
  <h1>Meal Tracker</h1>
  <router-view 
  :ingredients="ingredients"
  :meals="meals"
  :recipes="recipes"
  @addIngredient="addIngredient"
  @addMeal="addMeal"
  @removeMeal="removeMeal"
  ></router-view>
</template>

<script>
import recipes from './fake-data';

export default {
  name: 'App',
  data(){
    return{
        ingredients: [
            { name: 'Honey', amount: 3, units: 'tablespoons' },
            { name: 'Self-Rising Flour', amount: 10, units: 'cups'},
        ],
        meals: [],
        recipes,
    }
    },
    methods: {
      addIngredient({ name, amount, units }){
        this.ingredients.push({ name, amount, units })
      },
      addMeal({ date, recipe }){
        this.meals.push({ date, recipe });
      },
      removeMeal({ date }){
        this.meals = this.meals.filter(meal => {
          return meal.date.getYear() !== date.getYear()
                    || meal.date.getMonth() !== date.getMonth()
                    || meal.date.getDate() !== date.getDate();
        })
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
