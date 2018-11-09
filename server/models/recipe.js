const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Personal Recipes
const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  // username : [{type: Schema.Types.ObjectId, ref: 'Users' }] //trying to get user view to work
  username: {type: String}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
 