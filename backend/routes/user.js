const express = require('express');
const router = express.Router();
const checkEmail = require('../middleware/email-validation');

const userCtrl = require('../controllers/user');

router.post('/signup', checkEmail, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;