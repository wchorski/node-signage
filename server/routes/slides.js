const express = require('express');
const router = express.Router();
const controller = require('../controllers/slidesCont');
// const ROLES_LIST = require('../config/roles_list');
// const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
  .get(controller.getAll)
  .post(controller.create)

router.route('/:id')
  .get(controller.getOne)
  // TODO update permission for Editor
  .patch(controller.update)  
  .delete(controller.delete)

// TODO '/edit/:id' autofill editor with post to be updated
module.exports = router;