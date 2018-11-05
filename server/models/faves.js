const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Favorite Recipes
const faveSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true }
});

const Faves = mongoose.model("Faves", faveSchema);

module.exports = Faves;
