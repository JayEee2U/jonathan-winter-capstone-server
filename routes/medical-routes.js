const router = require('express').Router();
const medicalController = require('../controllers/medical_controller');

router.route('/').get(medicalController.index);
router.route("/:id").get(medicalController.findOne);

module.exports = router;