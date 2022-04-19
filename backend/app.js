const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');



mongoose.connect('mongodb+srv://Snezhana:Mojata1lozinka@cluster0.hpplv.mongodb.net/Cluster0?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => console.log('Successfuly connected to Mongo DB'))
  .catch(() => console.log('Connection failed!'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const saucesRoutes = require('./routes/sauces');
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;