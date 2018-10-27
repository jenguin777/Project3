const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Ingredients collection and inserts the Ingredients below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipewizard-auth");

// Ingredient seed data

const ingredientSeed = [
  {
    name: "Chicken",
    selected: "false"
  },
  {
    name: "Mixed Vegetables",
    selected: "false"
  },
  {
    name: "Salt",
    selected: "false"
  },
  {
    name: "Pepper",
    selected: "false"
  },
  {
    name: "Crushed Garlic",
    selected: "false"
  },
  {
    name: "Tomatoes",
    selected: "false"
  },
  {
    name: "Spaghetti Noodles",
    selected: "false"
  },
  {
    name: "Peas",
    selected: "false"
  },
  {
    name: "Cream of Mushroom Soup",
    selected: "false"
  },
  {
    name: "Flour",
    selected: "false"
  },
  {
    name: "Sugar",
    selected: "false"
  },
  {
    name: "Bread",
    selected: "false"
  },
  {
    name: "Butter",
    selected: "false"
  },
  {
    name: "Eggs",
    selected: "false"
  },
  {
    name: "Oatmeal",
    selected: "false"
  },
  {
    name: "Oregano",
    selected: "false"
  },
  {
    name: "Ground Turkey",
    selected: "false"
  },
  {
    name: "Tuna",
    selected: "false"
  }
];

db.Ingredient
  .remove({})
  .then(() => db.Ingredient.collection.insertMany(ingredientSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
