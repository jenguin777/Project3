const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  selected: {type: Boolean, default: false }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
