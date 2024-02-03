const router = require('express').Router();
const userController = require('../controllers/user-controller');

router
  .route('/')
  .get(userController.index)
  .post(userController.add);

router
  .route("/:id")
  .get(userController.findOne)
  .patch(userController.update)
  .delete(userController.remove);

router
  .route("/:id/events")
  .get(userController.posts);

  router
  .route("/:id/medical")
  .get(userController.medical);

module.exports = router;