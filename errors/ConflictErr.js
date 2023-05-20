module.exports = class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
