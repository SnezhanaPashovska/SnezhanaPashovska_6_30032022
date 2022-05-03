//--RegEx du email--//
const checkEmail = require('email-validator');
var validator = require("email-validator");
validator.validate("test@email.com");

/* module.exports = (req, res, next) => {
  const validEmail = (email) => {
    let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    let isRegexTrue = emailRegexp.test(email)
    isRegexTrue ? next() : res.status(400).json({ message: 'Invalid email' });
  }
  validEmail(req.body.email)
  next();
}; */

module.exports = (req, res, next) => {
  if (!checkEmail.validate(req.body.email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  } else {
    next();
  }
};

