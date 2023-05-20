module.exports = class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
