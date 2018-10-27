const router = require("express").Router();
const recipeRoutes = require("./recipes");
const ingredientRoutes = require("./ingredients");
const apiRoutes = require("./apiRoutes");

// Routes
router.use("/recipes", recipeRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/apirecipes", apiRoutes);

module.exports = router;
