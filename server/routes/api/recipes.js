const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipes"
router.route("/")
  .post(recipesController.create);

router.route('/username/:username').get(recipesController.findAll)
// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

module.exports = router;
