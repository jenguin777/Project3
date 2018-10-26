const router = require("express").Router();
const recipeRoutes = require("./recipes");
const bookRoutes = require("./books");
const ingredientRoutes = require("./ingredients");

// Routes
router.use("/books", bookRoutes);
router.use("/recipes", recipeRoutes);
router.use("/ingredients", ingredientRoutes);

module.exports = router;
