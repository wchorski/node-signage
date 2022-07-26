const express = require('express');
const router = express.Router();
const controller = require('../controllers/collectionNameCont');

router.route('/')
  .get(controller.getAll)
  .post(controller.create)

router.route('/:id')
  .get(controller.getOne)
  .delete(controller.delete)
  .patch(controller.update)

module.exports = router;