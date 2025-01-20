const jwt = require("egg-jwt");
module.exports = (options, app) => {
  return async function authToken(ctx, next) {
    const { token } = ctx.request.header;
    if (!token) {
      ctx.body = {
        code: 401,
        message: "请先登录",
      };
      return;
    }
    const { data } = this.verifyToken(token);
    if(data) {
      ctx.user = data;
      await next();
    }
    return
  };
};
