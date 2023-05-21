const Card = require('../models/card');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

module.exports = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return next(new NotFoundErr('Карточки с указанным id не существует'));
      }
      if (card.owner.toHexString() !== req.user._id) {
        return next(new ForbiddenErr('У вас нет прав на удаление чужой карточки'));
      }
      return next();
    })
    .catch(next);
};
