const express = require('express');
const router = express.Router();
const checkEmail = require('../middleware/email-validation');
const checkPassword = require('../middleware/password-validator');
const rateLimit = require('../middleware/passwordEntryLimit');
const userCtrl = require('../controllers/user');

router.post('/signup', checkPassword, checkEmail, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);

module.exports = router;