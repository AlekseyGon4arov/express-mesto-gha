module.exports = class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
