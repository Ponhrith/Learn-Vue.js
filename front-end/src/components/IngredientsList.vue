<template>
    <div class="listcontainer">
        <h3>Ingredients</h3>
        <!--Display Ingredients List-->
        <div v-for="ingredient in ingredients" :key="ingredient.name" class="list-item">
            <h3>{{ ingredient.name }}</h3>
            <p>{{ ingredient.name }} {{ ingredeint.units }}</p>
        </div>
        <router-link to="/add-ingredient">
            <button>+ Add Ingredient</button>
        </router-link>
    </div>
</template>

<script>
export default{
    name: 'IngredientsList',
    props: ['ingredients'],

}
</script>