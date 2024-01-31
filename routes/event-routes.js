const router = require('express').Router();
const eventController = require('../controllers/event-controller');

router.route('/').get(eventController.index);
router.route("/:id").get(eventController.findOne);

module.exports = router;