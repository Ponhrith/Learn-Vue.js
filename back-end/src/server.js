import express from 'express';
import { recipes } from './recipes.js';

let ingredients = [
    { name: 'Honey', amount: 3, units: 'tablespoons' },
    { name: 'Self-Rising Flour', amount: 10, units: 'cups'},
];

const app = express();

//path we're listening on, we called it a handler or endpoint
// app.get('/', (req, res) => {
//     res.send('Success!!');
// })

app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

app.get('/api/ingredients', (req, res) => {
    res.json(ingredients);
   
})

app.listen(8000, () => console.log('Server is listening on port 8000'));