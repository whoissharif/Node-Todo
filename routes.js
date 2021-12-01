const express = require('express');
const friendship_transaction_controller = require('./controllers/friendship_transaction_controller');
const post_controller = require('./controllers/post_controller');
const router = express.Router();
const userController = require('./controllers/user_controller');

router.post('/account/create', userController.createAccount);

router.post('/account/login', userController.login);

router.post('/account/post/create', post_controller.createPost);

router.post('/account/logout', userController.logout);

router.post('/send/request', friendship_transaction_controller.sendFriendRequest);

router.get('/get/allRequest',friendship_transaction_controller.allFriendRequest);

router.get('/get/allRequest/:userToken',friendship_transaction_controller.specificFriendRequest);


module.exports = router;