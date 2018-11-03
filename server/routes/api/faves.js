const router = require("express").Router();
const favesController = require("../../controllers/favesController");

// Matches with "/api/faves"
router.route("/")
  .get(favesController.findAll)
  .post(favesController.create);

// Matches with "/api/faves/:id"
router
  .route("/:id")
  .get(favesController.findById)
  .put(favesController.update)
  .delete(favesController.remove);

module.exports = router;
