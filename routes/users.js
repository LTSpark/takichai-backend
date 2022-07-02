const { Router } = require('express');

const router = Router();

const UsersController = require('../users/users.controller');
const UsersGuard = require('../users/users.guard');

router.get('/user', UsersGuard.getLoggedUser, UsersController.getLoggedUser);

router.get('/users', UsersController.getAll);
router.get('/users/:id', UsersController.getUserById);

router.post('/users/', UsersController.create);
router.post('/users/login', UsersController.login);

router.patch('/users/subscribe', UsersGuard.subscribe, UsersController.subscribe);
router.patch('/users/unsubscribe', UsersGuard.unsubscribe, UsersController.unsubscribe);

module.exports = router;