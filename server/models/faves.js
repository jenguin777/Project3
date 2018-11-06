const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Favorite Recipes
const faveSchema = new Schema({
  title: { type: String, required: true },
  href: { type: String, required: true },
  ingredients: { type: String, required: true },
  thumbnail: { type: String, required: true },
  selected: {type: Boolean, default: false }
});

const Faves = mongoose.model("Faves", faveSchema);

module.exports = Faves;
