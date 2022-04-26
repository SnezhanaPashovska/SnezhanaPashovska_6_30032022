//--Imports--//
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const MaskData = require('maskdata')

//--Mask the email address--//

/* const emailMask2Options = {
  maskWith: "*", 
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
}; */

//--Mask password--//
/* const maskPasswordOptions = {
  maskWith: "*",
  maxMaskedCharacters: 30,
  unmaskedStartCharacters: 0,
  unmaskedEndCharacters: 0
}; */


//--Signup function--//

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email, 
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Your account has been created!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//--Login function--//

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid user!' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

