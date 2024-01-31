const router = require('express').Router();
const eventController = require('../controllers/event-controller');

router
    .route('/')
    .get(eventController.index)
    .post(eventController.add)
    .delete(eventController.remove);

router 
    .route("/:id")
    .get(eventController.findOne)
    .patch(eventController.update);

module.exports = router;