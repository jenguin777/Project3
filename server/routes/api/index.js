const router = require("express").Router();
const recipeRoutes = require("./recipes");
const recipeApiRoutes = require("./recipeApi");
const ingredientRoutes = require("./ingredients");

// Routes
router.use("/recipes", recipeRoutes);
router.use("/apirecipes", recipeApiRoutes)
router.use("/ingredients", ingredientRoutes);

module.exports = router;
