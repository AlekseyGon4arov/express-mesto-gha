const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegEx } = require('../utils/constans');
const {
  getUsers,
  getUserById,
  editProfile,
  updateAvatar,
  getMe
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getMe);

usersRouter.get('/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24).message('Некорректный id'),
  }).required(),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .message('Имя должно быть от 2 до 30 символов'),
    about: Joi.string()
      .min(2)
      .max(30)
      .message('Это поле должно быть от 2 до 30 символов'),
  }).required(),
}), editProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object({
    avatar: Joi.string().regex(urlRegEx).message('Некорректная ссылка'),
  }).required(),
}), updateAvatar);

module.exports = usersRouter;
