const router = require("express").Router();
const recipeRoutes = require("./recipes");
const ingredientRoutes = require("./ingredients");

// Routes
router.use("/recipes", recipeRoutes);
router.use("/ingredients", ingredientRoutes);

module.exports = router;
