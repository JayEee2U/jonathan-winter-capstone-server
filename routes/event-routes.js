const router = require('express').Router();
const eventController = require('../controllers/event-controller');

router
    .route('/')
    .get(eventController.index)
    .post(eventController.add);
    

router 
    .route("/:id")
    .get(eventController.findOne)
    .patch(eventController.update)
    .delete(eventController.remove);

module.exports = router;