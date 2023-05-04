const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  editProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', editProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;