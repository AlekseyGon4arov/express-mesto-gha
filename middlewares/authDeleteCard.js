const Card = require('../models/card');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

module.exports = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        next(new NotFoundErr('Карточки с указанным id не существует'));
      }
      if (card.owner.toHexString() !== req.user._id) {
        next(new ForbiddenErr('Вы не можете удалить данную карточку'));
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch(next);
};
