const Card = require('../models/card');
const NotFoundErr = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');

const checkCard = (card, res) => {
  if (!card) {
    throw new NotFoundErr('Карточка с указанным id не найдена');
  }
  return res.send(card);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res
        .status(201)
        .send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные при создании карточки'));
      } else next(error);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        throw new NotFoundErr('Карточка с указанным _id не найдена.');
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true }
  )
    .then((card) => checkCard(card, res))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true }
  )
    .then((card) => checkCard(card, res))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
