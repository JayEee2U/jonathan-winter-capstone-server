const router = require('express').Router();
const userController = require('../controllers/user-controller');

router
  .route('/')
  .get(userController.index)
  .post(userController.add);

  router
  .route("/current")
  .get(userController.current); 
  
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

  router
  .route("/register")
  .post(userController.register);

  router
  .route("/login")
  .post(userController.login); 

  



module.exports = router;