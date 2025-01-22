const { Service } = require("egg");
class InteractionService extends Service {
  async joinAttack() {
    // const { data } = ctx.userInfo;
    const { ctx, app } = this;
    app.ws.clients.forEach((item) => {
      console.log(item.socket);
    });
    // console.log(app.ws);

    ctx.websocket.on("message", (data) => {});
    ctx.websocket.on("close", (e) => {});
  }

  static async startGames(socket1, socket2) {
    const wordList = await this.ctx.service.word.getWords();
    let total = 0;
    const timer = setInterval(() => {
      if (index++ >= 10) {
        clearInterval(timer);
      }
      const data = {
        type: "word",
        data: 1111,
      };
      socket1.send(JSON.stringify(word));
      socket2.send(JSON.stringify(word));
    }, 1000);
  }
}

module.exports = InteractionService;
