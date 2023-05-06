const Card = require('../models/card');

const { ERROR, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/constans');

const checkCard = (card, res) => {
  if (card) {
    return res.send(card);
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'Карточка с указанным id не найдена' });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const createCard = (req, res) => {
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
        return res
          .status(ERROR)
          .send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным id не найдена' });
      }
      return res
        .send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(ERROR)
          .send({ message: 'Некорректный id' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => checkCard(card, res))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(ERROR)
          .send({ message: 'Некорректный id' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => checkCard(card, res))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(ERROR)
          .send({ message: 'Некорректный id' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
