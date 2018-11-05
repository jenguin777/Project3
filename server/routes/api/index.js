const router = require("express").Router();
const recipeRoutes = require("./recipes");
const favesRoutes = require("./faves"); //new NL
const recipeApiRoutes = require("./recipeApi");
const ingredientRoutes = require("./ingredients");

// Routes
router.use("/recipes", recipeRoutes);
router.use("/faves", favesRoutes);  //new NL
router.use("/apirecipes", recipeApiRoutes)
router.use("/ingredients", ingredientRoutes);

module.exports = router;
