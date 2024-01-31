const router = require("express").Router();
const userController = require("../controllers/inventory-controller");

router.route("/").get(inventoryController.index).post(inventoryController.add);
router
  .route("/:id")
  .get(inventoryController.findOne)
  .delete(inventoryController.deleteItem)
  .put(inventoryController.update);

module.exports = router;