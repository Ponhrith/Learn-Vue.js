import express from 'express';
import { v4 as uuid } from 'uuid';
import { recipes } from './recipes.js';

let ingredients = [
    { name: 'Honey', amount: 3, units: 'tablespoons' },
    { name: 'Self-Rising Flour', amount: 10, units: 'cups'},
];

let meals = [
    { id: '1234', date: new Date(), recipeId: '123' }
]

const app = express();

//take care of request body
app.use(express.json());

//path we're listening on, we called it a handler or endpoint
// app.get('/', (req, res) => {
//     res.send('Success!!');
// })

app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

app.get('/api/ingredients', (req, res) => {
    res.json(ingredients);
   
});

app.get('/api/meals', (req, res) => {
    const populatedMeals = meals.map(meal => {
        const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
        return{
            //spread operator
            ...meal,
           
            recipe: recipeForMeal,

        };
    });
    res.json(populatedMeals);
});

app.post('/api/ingredients', (req, res) => {
    const {name, amount, units} = req.body;
    //put into array
    ingredients.push({ name, amount, units });
    res.json(ingredients);
});

app.post('/api/meals', (req, res) => {
    const { date, recipeId } = req.body;
    meals.push({  id: uuid(), date: new Date(date), recipeId });
    res.json(meals);
});

// /api/ingredients/Apples
app.put('/api/ingredients/:name', (req, res) => {
    const { name: ingredientName } = req.params;
    const { name, amount, units } = req.body;

    const ingredient = ingredients.find(ingredient => ingredient.name === ingredientName );

    ingredient.name = name || ingredient.name;
    ingredient.units = units || ingredient.units;
    ingredient.amount = amount || ingredient.name;

    res.json(ingredients);
});

app.put('/api/meals/:id', (req, res) => {
    const { id: mealId } = req.body;
    const { date, recipeId } = req.body;
    const meal = meals.find(meal => meal.id === mealId);
    meal.date = (date && new Date(date)) || meal.date;
    meal.recipeId = recipeId || meal.recipeId;

    res.json(meals);
})

app.listen(8000, () => console.log('Server is listening on port 8000'));