module.exports = (options, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // all err
      ctx.emit("error", err, ctx); // 触发全局监听error, 框架会记录一条错误日志
      ctx.status = err.status || 500;

      const error =
        ctx.status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;
      // ctx.body = err.message;
      //生产环境时 500 错误页面不复现 因为可能包含敏感信息
      ctx.body = {
        code: err.status || 500,
        message: error,
        data: null,
      };
      // status 4xx/5xx
      //   ctx.app.emit("error", err, ctx);
    }
  };
};
