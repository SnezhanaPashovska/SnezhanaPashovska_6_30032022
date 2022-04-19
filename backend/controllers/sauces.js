const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    heat: req.body.heat,
    userId: req.body.userId
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce added successfully!'
      });
    }
  )
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    }
    );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id,
    name: req.params.name,
    manufacturer: req.params.manufacturer,
    description: req.params.description,
    imageUrl: req.params.imageUrl,
    mainPepper: req.params.mainPepper,
    heat: req.params.heat,
    userId: req.params.userId
  });
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(
      () => {
        res.status(200).json({
          message: 'Sauce updated!'
        });
      }
    )
    .catch((error) => {
      res.status(400).json({ error })
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (!sauce) {
        res.status(404).json({
          error: new Error('No such Thing!')
        });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      Sauce.deleteOne({ _id: req.params.id }).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(saucess => res.status(200).json(saucess))
    .catch(error => res.status(400).json({ error }));
};