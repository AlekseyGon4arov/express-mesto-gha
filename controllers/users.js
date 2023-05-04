const User = require('../models/user');

const ERROR = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const checkUser = (user, res) => {
  if (user) {
    return res.send(user);
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'Пользователь по указанному id не найден' });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR)
          .send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(ERROR).send({ message: 'Некорректный id' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const editProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => checkUser(user, res))
    .catch((error) => {
      console.log(error);
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR)
          .send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR)
          .send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  editProfile,
  updateAvatar,
};
