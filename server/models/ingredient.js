const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  selected: {type: Boolean, default: false },
  // username : [{type: Schema.Types.ObjectId, ref: 'Users' }] //trying to get user view to work
  username: {type: String}
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
