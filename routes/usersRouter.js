const Router = require('express');
const usersController = require('../controllers/usersController');
const router = new Router();

router.get('/', usersController.getUsers);
router.delete('/', usersController.deleteUser);
router.put('/changestatus', usersController.changeUserStatus);

module.exports = router;