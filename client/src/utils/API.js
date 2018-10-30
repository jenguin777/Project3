import axios from "axios";

export default {

  // --------INGREDIENTS--------------
  // Gets all ingredients
  getIngredients: function() {
    return axios.get("/api/ingredients");
  },
  // Gets the ingredient with the given id
  getIngredient: function(id) {
    return axios.get("/api/ingredients/" + id);
  },
  // Deletes the ingredient with the given id
  deleteIngredient: function(id) {
    return axios.delete("/api/ingredients/" + id);
  },
  // Saves an ingredient to the database
  saveIngredient: function(ingredientData) {
    return axios.post("/api/ingredients", ingredientData);
  },

  // --------RECIPES (FROM API)--------------
  // Gets all recipes from API using search query
  getApiRecipes: function(query) {
    console.log("API Query: " + query);
    return axios.get("/api/apirecipes", { params: { q: query } });
  },

   // --------PERSONAL RECIPES--------------
  // Gets all personal recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets the personal recipe with the given id
  getRecipe: function(id) {
    return axios.get("/api/recipes/" + id);
  },
  // Deletes the persoanl recipe with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a personal recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  }

};
