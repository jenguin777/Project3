const router = require("express").Router();
const favesController = require("../../controllers/favesController");

// Matches with "/api/faves"
router.route("/")
  .post(favesController.create);

// Matches with "/api/faves/:id"
router.route('/username/:username').get(favesController.findAll);

router
  .route("/:id")
  .get(favesController.findById)
  .put(favesController.update)
  .delete(favesController.remove);

module.exports = router;
