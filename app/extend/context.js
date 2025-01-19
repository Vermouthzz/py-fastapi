module.exports = {
  apiSuccess(code = 200, data = "", msg = "success") {
    return {
      code,
      data,
      msg,
    };
  },
  generateToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret, {
      expiresIn: "1h",
    });
  },
  verifyToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
};
