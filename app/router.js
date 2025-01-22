/**
 * @param {Egg.Application} app - egg application
 */
const Word = require("./router/word");
const User = require("./router/user");
module.exports = (app) => {
  const { router, controller } = app;
  // Word(app);
  User(app);
  // app.ws.use(async (ctx, next) => {
  //   const token = ctx.query.token;
  //   try {
  //     const data = await app.jwt.verify(token, app.config.jwt.secret);
  //     if (!data) {
  //       ctx.websocket.send({
  //         code: 401,
  //         type: "error",
  //         msg: "请重新登录",
  //       });
  //       ctx.websocket.close();
  //       return;
  //     }
  //     const res = await ctx.model.user.findOne({ id: data.id });
  //     if (!res) {
  //       ctx.websocket.send({
  //         code: 401,
  //         type: "error",
  //         msg: "用户不存在,请重新登录",
  //       });
  //     }
  //     app.ws.clients.user_id = data.id;
  //   } catch (error) {
  //     ctx.websocket.close();
  //   }
  //   await next();
  // });
  app.ws.matches = new Map();
  app.ws.route("/ws", controller.interaction.joinAttack);
};
