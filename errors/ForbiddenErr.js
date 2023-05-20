module.exports = class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
