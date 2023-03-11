import express from 'express';
import { MongoClient } from 'mongodb';
import { v4 as uuid } from 'uuid';
import { generateShoppingList } from './generateShoppingList.js';


const startServer = async() => {
    
const app = express();

//take care of request body
app.use(express.json());

const client = await MongoClient.connect('mongodb://localhost:27017', {
    //poolSize tell Mongodb to keep a certain of connections open
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = client.db('fsv-meal-tracker');

//path we're listening on, we called it a handler or endpoint
// app.get('/', (req, res) => {
//     res.send('Success!!');
// })

app.get('/api/recipes', async (req, res) => {
    const { search } = raq/query;

    const recipes = await db.collection('recipes').find({}).toArray();

    const matchingRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(search) 
        || recipe.ingredients.some(ingredient => {
            return ingredient.name.toLowerCase().includes(search);
        });
    })
    res.json(matchingRecipes);
});

app.get('/api/ingredients', async (req, res) => {
    const ingredients = await db.collection('ingredients').find({}.toArray());
    res.json(ingredients);
   
});

app.get('/api/meals', async (req, res) => {
    const meals = await db.collection('meals').find({}).toArray();
    const recipes = await db.collection('recipes').find({}).toArray();
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

app.post('/api/ingredients', async (req, res) => {

    const {name, amount, units} = req.body;
    //put into array
    // ingredients.push({ name, amount, units });
    await db.collection('ingredients').insertOne({
        name,
        amount,
        units
    });

    const recipes = await db.collection('recipes').find({}).toArray();

    res.json(ingredients);
});

app.post('/api/meals', async (req, res) => {
    const { date, recipeId } = req.body;
    // meals.push({  id: uuid(), date: new Date(date), recipeId });
    await db.collection('meals').insertOne({
        id: uuid(),
        date: new Date(date),
        recipeId,
    });
    const meals = await db.collection('meals').find({}).toArray();
    const recipes = await db.collection('recipes').find({}).toArray();
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

// /api/ingredients/Apples
app.put('/api/ingredients/:name', async (req, res) => {
    const { name: ingredientName } = req.params;
    const { name, amount, units } = req.body;

    // const ingredient = ingredients.find(ingredient => ingredient.name === ingredientName );

    const ingredient = await db.collection('ingredient').findOne({ name: ingredientName });

    ingredient.name = name || ingredient.name;
    ingredient.units = units || ingredient.units;
    ingredient.amount = amount || ingredient.name;

    await db.collection('ingredients').updateOne({ name: ingredientName }, {
        $set: ingredient,
    });

    const updatedIngredients = db.collection('ingredients').find({}).toArray();

    res.json(updatedIngredients);
});

app.put('/api/meals/:id', async (req, res) => {
    const { id: mealId } = req.body;
    const { date, recipeId } = req.body;
    // const meal = meals.find(meal => meal.id === mealId);

    const meal = await db.collection('meals').findOne({ id: mealId});

    meal.date = (date && new Date(date)) || meal.date;
    meal.recipeId = recipeId || meal.recipeId;

    await db.collection('meals').updateOne({ id: mealId},{
        $set: meal,
    });

    const updatedMeals = await db.collection('meals').find({}).toArray;

    res.json(updatedMeals);
})

app.delete('/api/ingredients/:name', (res, req) => {
    const { name } = req.params;
    ingredients = ingredients.filter(ingredients => ingredient.name !== name);
    res.json(ingredients);
});

app.delete('/api/meals/:id', (req, res) => {
    const { id } = req.params;
    meal = meals.filter(meal => meal.id !== id);
    res.json(meals);
});

app.get('/api/shopping-list', async (req, res) => {
    const meals = await db.collection('meals').find({}).toArray();
    const recipes = await db.collection('recipes').find({}).toArray();
    const ingredients = await db.collection('ingredients').find({}).toArray();
    const populatedMeals = meals.map(meal => {
        const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
        return{
            //spread operator
            ...meal,
           
            recipe: recipeForMeal,

        };
    });
    const shoppingList = (generateShoppingList(populatedMeals, ingredients));
    res.json(shoppingList);


});



app.listen(8000, () => console.log('Server is listening on port 8000'));

}
