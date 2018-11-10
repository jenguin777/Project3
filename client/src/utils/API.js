import axios from "axios";

export default {

  // --------INGREDIENTS--------------
  // Gets all ingredients
  getIngredients: function(username) {
    return axios.get(`/api/ingredients/username/${username}`);
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
  // Updates an ingredient with the given id
  updateIngredient: function(id, ingredientData) {
    return axios.put("/api/ingredients/" + id, ingredientData);
  },
  // Updates all ingredients with the given criteria
  updateIngredients: function(filter, ingUpdate) {
    return axios.put("/api/ingredients/", {filter, ingUpdate});
  },


  // --------RECIPES (FROM API)--------------
  // Gets all recipes from API using search query
  getApiRecipes: function(query) {
    console.log("API Query: " + query);
    return axios.get("/api/apirecipes", { params: { q: query } });
  },

   // --------PERSONAL RECIPES--------------
  // Gets all personal recipes
  getRecipes: function(username) {
    return axios.get(`/api/recipes/username/${username}`);
  },
  // Gets the personal recipe with the given id
  getRecipe: function(id) {
    return axios.get("/api/recipes/" + id);
  },
  // Deletes the personal recipe with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a personal recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
   // Updates a personal recipe with the given id
   updateRecipe: function(id, recipeData) {
    return axios.put("/api/recipes/" + id, recipeData);
  },

   // --------FAVORITE RECIPES--------------
  // Gets all favorite recipes
  getFaves: function(username) {
    return axios.get(`/api/faves/username/${username}`);
  },
  // Gets the favorite recipe with the given id
  getFave: function(id) {
    return axios.get("/api/faves/" + id);
  },
  // Deletes the favorite recipe with the given id
  deleteFave: function(id) {
    return axios.delete("/api/faves/" + id);
  },
  // Saves a favorite recipe to the database
  saveFave: function(recipeData) {
    console.log(recipeData);
    return axios.post("/api/faves", recipeData);
  }

};
