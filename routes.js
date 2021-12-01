const express = require('express');
const post_controller = require('./controllers/post_controller');
const router = express.Router();
const userController = require('./controllers/user_controller');

router.post('/account/create', userController.createAccount);

router.post('/account/login',userController.login);

router.post('/account/post/create',post_controller.createPost);


module.exports = router;