const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegEx } = require('../utils/constans');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Некорректный формат почты',
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false
  },
  name: {
    type: String,
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: 'Некорректный URL'
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  }
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
