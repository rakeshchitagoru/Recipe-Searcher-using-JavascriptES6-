import axios from 'axios';

export default class Recipe  {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numofIngredients = this.ingredients.length;
        const periods = Math.ceil(numofIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon','teaspoons','cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp','oz','oz','tsp','tsp','cup','pound']; 


        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
                let ingredient = el.toLowerCase();
                unitsLong.forEach((unit, i) => {
                    ingredient = ingredient.replace(unit, unitShort[i]);
                });

            // 2. Remove Parenthesis
                ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            //3. Parse ingredients into count ,unit and ingredient 
                return ingredient;

        });
        this.ingredients = newIngredients;
    }






}


