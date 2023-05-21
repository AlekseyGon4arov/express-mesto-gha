const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundErr = require('../errors/NotFoundErr');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundErr('Такого роута нет'));
});

module.exports = router;
