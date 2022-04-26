//--Imports--//
const express = require('express');
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const mongoSanitize = require('express-mongo-sanitize');
const nocache = require("nocache");
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to MongoDB Atlas !'))
  .catch(() => console.log('Connection to MongoDB Atlas failed !'));

const app = express();

app.use(mongoSanitize());

//--This Express middleware sets some HTTP response headers to try to disable client-side caching.--//
app.use(nocache());

logger.info(`I'm an information line`);
logger.debug(`I'm a debug line`);
logger.error(`I'm an error line`);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use(helmet());
app.use((req, res, next) => {
  helmet.crossOriginResourcePolicy('same-site');
  helmet.frameguard('deny');
  helmet.hsts({ maxAge: 123456, includeSubDomains: false, preload: true });
  helmet.noSniff('noSniff');
  helmet.dnsPrefetchControl('false');
  helmet.ieNoOpen();
  helmet.referrerPolicy('strict-origin');
  helmet.xssFilter();
  helmet.crossOriginOpenerPolicy('same-origin');
  next();
});
app.disable("x-powered-by");

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);




module.exports = app;