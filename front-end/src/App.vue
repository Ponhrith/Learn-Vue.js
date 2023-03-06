<template>
  <h1>Meal Tracker</h1>
  <router-view 
  :ingredients="ingredients"
  :meals="meals"
  @addIngredient="addIngredient">
  </router-view>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
        ingredients: [
            { name: 'Honey', amount: 3, units: 'tablespoons' },
            { name: 'Self-Rising Flour', amount: 10, units: 'cups'},
        ],
        meals: [],
    }
    },
    methods: {
      addIngredient({ name, amount, units }){
        this.ingredients.push({ name, amount, units })
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
