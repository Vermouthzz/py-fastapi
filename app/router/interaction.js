module.exports = (app) => {
  const { router, controller, ws } = app;
  // app.ws.use(async (ctx, next) => {
  //   const token = ctx.query.token;
  //   try {
  //     const data = ctx.verifyToken(token)
  //     if (!data) {
  //       ctx.websocket.send({
  //         code: 401,
  //         type: "error",
  //         msg: "请重新登录",
  //       });
  //       ctx.websocket.close();
  //       return;
  //     }
  //     const res = await ctx.model.User.findOne({ where: { id: data.user_id } });
  //     if (!res) {
  //       ctx.websocket.send({
  //         code: 401,
  //         type: "error",
  //         msg: "用户不存在,请重新登录",
  //       });
  //     }
  //     // ctx.user = res;
  //     await next();
  //   } catch (error) {
  //     console.log(error);
  //     ctx.websocket.close();
  //   }
  // });
  app.ws.route("/ws", controller.interaction.joinAttack);
};
