const { Service } = require('egg');
class InteractionService extends Service {
  async joinAttack(ctx, app) {
    const { data } = ctx.userInfo;
    console.log(app.ws.clients);
    ctx.websocket.on("message", () => {
      console.log(111);
      ctx.websocket.send("hello");
    });
  }
}

module.exports = InteractionService;
