import express from 'express';
import { MongoClient } from 'mongodb';
import { v4 as uuid } from 'uuid';
import cors from 'cors';
import { generateShoppingList } from './generateShoppingList.js';

const startServer = async () => {
    const app = express();
    app.use(cors());
    // const { v4: uuid } = require('uuid');

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
        const { search } = req.query;

        const recipes = await db.collection('recipes').find({}).toArray();

        const matchingRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(search)
                || recipe.ingredients.some(ingredient => {
                    return ingredient.name.toLowerCase().includes(search);
                });
        });

        res.json(matchingRecipes);
    });

    app.get('/api/ingredients', async (req, res) => {
        const ingredients = await db.collection('ingredients').find({}).toArray();
        res.json(ingredients);
    });

    app.get('/api/meals', async (req, res) => {
        const meals = await db.collection('meals').find({}).toArray();
        const recipes = await db.collection('recipes').find({}).toArray();

        const populatedMeals = meals.map(meal => {
            const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
            return {
                //spread operator
                ...meal,
                recipe: recipeForMeal,
            };
        });

        res.json(populatedMeals);
    });

    app.post('/api/ingredients', async (req, res) => {
        const { name, amount, units } = req.body;
        //put into array
        // ingredients.push({ name, amount, units });

        await db.collection('ingredients').insertOne({
            name,
            amount,
            units,
        });

        const ingredients = await db.collection('ingredients').find({}).toArray();

        res.json(ingredients);
    });

    app.post('/api/meals', async (req, res) => {
        const { date, recipeId } = req.body;
        // meals.push({ id: uuid(), date: new Date(date), recipeId });

        await db.collection('meals').insertOne({
            id: uuid(),
            date: new Date(date),
            recipeId,
        });

        const meals = await db.collection('meals').find({}).toArray();
        const recipes = await db.collection('recipes').find({}).toArray();

        const populatedMeals = meals.map(meal => {
            const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
            return {
                ...meal,
                recipe: recipeForMeal,
            };
        });

        res.json(populatedMeals);
    });

    app.put('/api/ingredients/:name', async (req, res) => {
        const { name: ingredientName } = req.params;
        const { name, amount, units } = req.body;

        // const ingredient = ingredients.find(ingredient => ingredient.name === ingredientName );

        const ingredient = await db.collection('ingredients').findOne({ name: ingredientName });

        ingredient.name = name || ingredient.name;
        ingredient.amount = amount || ingredient.amount;
        ingredient.units = units || ingredient.units;

        await db.collection('ingredients').updateOne({ name: ingredientName }, {
            $set: ingredient,
        });

        const updatedIngredients = await db.collection('ingredients').find({}).toArray();

        res.json(updatedIngredients);
    });

    app.put('/api/meals/:id', async (req, res) => {
        const { id: mealId } = req.params;
        const { date, recipeId } = req.body;
        // const meal = meals.find(meal => meal.id === mealId);

        const meal = await db.collection('meals').findOne({ id: mealId });
        const recipes = await db.collection('recipes').find({}).toArray();

        meal.date = (date && new Date(date)) || meal.date;
        meal.recipeId = recipeId || meal.recipeId;

        await db.collection('meals').updateOne({ id: mealId }, {
            $set: meal,
        });

        const updatedMeals = await db.collection('meals').find({}).toArray();

        const populatedMeals = updatedMeals.map(meal => {
            const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
            return {
                ...meal,
                recipe: recipeForMeal,
            };
        });

        res.json(populatedMeals);
    });

    app.delete('/api/ingredients/:name', async (req, res) => {
        const { name } = req.params;
        // ingredients = ingredients.filter(ingredients => ingredient.name !== name);

        await db.collection('ingredients').deleteOne({ name });
        const ingredients = await db.collection('ingredients').find({}).toArray();

        res.json(ingredients);
    });

    app.delete('/api/meals/:id', async (req, res) => {
        const { id } = req.params;
        // meal = meals.filter(meal => meal.id !== id);

        await db.collection('meals').deleteOne({ id });
        const meals = await db.collection('meals').find({}).toArray();
        const recipes = await db.collection('recipes').find({}).toArray();

        const populatedMeals = meals.map(meal => {
            const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
            return {
                ...meal,
                recipe: recipeForMeal,
            };
        });

        res.json(populatedMeals);
    });

    app.get('/api/shopping-list', async (req, res) => {
        const meals = await db.collection('meals').find({}).toArray();
        const recipes = await db.collection('recipes').find({}).toArray();
        const ingredients = await db.collection('ingredients').find({}).toArray();

        const populatedMeals = meals.map(meal => {
            const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
            return {
                ...meal,
                recipe: recipeForMeal,
            };
        });

        const shoppingList = generateShoppingList(populatedMeals, ingredients);

        res.json(shoppingList);
    });

    app.listen(8000, () => console.log('Server is listening on port 8000'));
}

startServer();