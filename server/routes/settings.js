const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsCont');

router.route('/')
  .get(controller.getAll)
  .post(controller.create)

router.route('/:id')
  .patch(controller.update)

module.exports = router;