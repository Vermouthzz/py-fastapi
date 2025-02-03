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
      expiresIn: "24h",
    });
  },
  verifyToken(token) {
    if(!token) return false;
    token = token.split('Bearer ')[1]
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
};
