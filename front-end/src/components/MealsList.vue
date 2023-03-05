<template>
    <h3>Planned Meals</h3>
    <div v-for="day in nextSevenDays"  :key="day.getDate()" class="list-item">
            <h3>{{ day.getDate() }}</h3>
            //current selected Recipe
            <p>No meal planned</p>
            //button to add new meal
            <div class="right-action">
                //router link will link users to another page               
                <router-link to="/recipes">
                    <button>Add</button>
                </router-link>
            </div>
    </div>
</template>

<script>

export default{
    name: 'MealsList',
    data(){ //give us the next seven days as an array
        return{
            nextSevenDays: Array(7).fill().ap((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date;
        })
        }
    }
}
</script>