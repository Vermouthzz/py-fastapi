/**
 * @param {Egg.Application} app - egg application
 */
const Word = require("./router/word");
module.exports = (app) => {
  const { router, controller } = app;
  // Word(app);

  // app.ws.use(async (ctx, next) => {
  //   // const token = ctx.query.token;
  //   await next();
  // });

  // app.ws.route("/ws", controller.Interaction.joinAttack);
};
