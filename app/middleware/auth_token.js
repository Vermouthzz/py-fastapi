
module.exports = (options, app) => {
  return async function authToken(ctx, next) {
    const { token } = ctx.request.header;
    console.log(token, 'middle token');
    
    if (!token) {
      ctx.body = {
        code: 401,
        message: "请先登录",
      };
      return;
    }
    const { data } = ctx.verifyToken(token);
    console.log(data);

    if (data) {
      ctx.user = data;
      await next();
    }
    return
  };
};
