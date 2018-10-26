const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  category: String,
  date: { type: Date, default: Date.now }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
