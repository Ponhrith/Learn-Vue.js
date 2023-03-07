<template>
    <div class="page">
        <div class="centered-container">
            <h1>Add Meal to Plan</h1>
            <input 
            type="text"
            class="full-width space-before space-after"
            placeholder="Enter keyword here"
            v-model="searchString"
            />
        <button 
            class="full-width space-after"
            @click="submitSearch"
            >Search
        </button>
        <p v-if="!hasSearched">Enter a keyword and click "search" to find recipes</p>
        <p v-if="hasSearched && searchResults.length === 0">Thre were no results for that keyword</p>
        <div 
        v-for="recipe in searchResults" 
        :key="recipe.id" 
        class="search-list-item"    
        @click="selectRecipe(recipe)"
        >
        <!-- click handler called the method we just defined with whatever recipe the user has selected -->
        <h3>{{ recipe.name }}</h3>
        </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'RecipeSearchPage',
    props:['recipes'],
    data() {
        return{
            searchString: '',
            searchResults: [],
            hasSearched: false
        }
    },
    methods: {
        submitSearch(){
            this.searchResults = this.recipes.filter(recipe => {
                return recipe.name.toLowerCase().includes(this.searchString.toLowerCase());
            });
            this.hasSearched = true;
            
        },
        selectRecipe(recipe){
            const date = new Date (this.$route.query.date);
            this.$emit('addMeal', { date, recipe });
            this.$router.push('/');
        }
    }
}
</script>