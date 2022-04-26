const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Your account has been blocked. You have entered an incorrect password 3 times in a row. Please wait 15 minutes and try again.",
})

module.exports = limiter;