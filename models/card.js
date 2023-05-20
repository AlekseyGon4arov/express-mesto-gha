const mongoose = require('mongoose');
const { urlRegEx } = require('../utils/constans');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30']
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
