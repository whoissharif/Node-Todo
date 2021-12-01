const express = require('express');
const router = express.Router();
const userController = require('./controllers/user_controller');

router.post('/account/create', userController.createAccount);

router.post('/account/login',userController.login);


module.exports = router;