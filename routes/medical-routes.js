const router = require('express').Router();
const medicalController = require('../controllers/medical_controller');

router
    .route('/')
    .get(medicalController.index)
    .post(medicalController.add)
    .delete(medicalController.remove);

router
    .route("/:id")
    .get(medicalController.findOne)
    .patch(medicalController.update);

module.exports = router;