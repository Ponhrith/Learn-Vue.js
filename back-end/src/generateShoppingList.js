export const generateShoppingList = (populatedMeals, userIngredients) => {
    let missingIngredients = { };

    //getting properties for given existing ingredients
    for(let meal of populatedMeals){
        for (let mealIngredient of meal.recipe.ingredients){
            if (!userIngredients.some(userIngredient => mealIngredient.name === userIngredient.name)){
                missingIngredients[mealIngredient.name] = {
                    ...(missingIngredients[mealIngredient.name] || {}),
                    [mealIngredient.units] : mealIngredient.amount} +
                    ((missingIngredients[mealIngredient.name] && missingIngredients[mealIngredient.name][mealIngredient.units]) || 0)
        }
    }
}
    const ShoppingList = Object.keys(missingIngredients).map(ingredientName => {
        const missingAmountObj = missingIngredients[ingredientName]
        const missingAmounts = Object.keys(missingAmountsObj).map(units => {
           return  `${missingAmountObj[units]} ${units}`;
        }).join(' + ');
        return `${ingredientName}: ${missingAmounts}`;
    })
    return ShoppingList;
}