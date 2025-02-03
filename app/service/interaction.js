const { Service } = require("egg");
const { v4: uuidv4 } = require("uuid");
const { shuffleArr } = require("../utils/index");
class InteractionService extends Service {
  constructor(ctx) {
    super(ctx);
    this.app = ctx.app;
    if (!this.app.playersQueue) {
      this.app.playersQueue = []; // 玩家队列
    }
    if (!this.app.games) {
      this.app.games = []; // 当前进行中的对战
    }
  }

  async joinAttack() {
    const { ctx } = this;
    ctx.websocket.on("message", async (data) => {
      console.log(data, "收到的信息");

      const message = JSON.parse(data);

      if (message.type === "join") {
        // 玩家加入对战
        await this.handleJoin(message, ctx.websocket);
      } else if (message.type === "answer") {
        // 处理答案
        await this.handleAnswer(message, ctx.websocket);
      } else if (message.type === "start") {
        await this.startQuestion(message.game_id, ctx.websocket);
      }
    });

    ctx.websocket.on("close", (e) => {
      console.log("WebSocket connection closed:", e);
      this.handleDisconnect(ctx.websocket);
    });
    ctx.websocket.on("error", (e) => {
      console.log("WebSocket error:", e);
    })
  }

  async getInteractionInfo() {

  }

  async recordGameResult(game_id, winner_id) {

  }

  async handleJoin(message, socket) {
    // console.log(11111);
    const { ctx } = this;
    const { token } = ctx.request.query;
    const info = ctx.verifyToken(token);
    if (!info) return;
    const { user_id } = info;

    const userInfo = await ctx.model.User.findOne({
      where: { id: user_id },
      attributes: ["avatar"],
    });

    const remoteAddress = socket._socket.remoteAddress;
    const remotePort = socket._socket.remotePort;
    const localAddress = socket._socket.localAddress;
    const localPort = socket._socket.localPort;
    const uniqueId = `${remoteAddress}:${remotePort}-${localAddress}:${localPort}`;
    const player = {
      socket,
      be_ready: false,
      userinfo: {
        ...userInfo.dataValues,
        score: 0,
        is_winner: false,
      },
      id: uniqueId,
    };

    if (this.app.playersQueue.some((item) => item.id === uniqueId)) return;
    this.app.playersQueue.push(player);

    // 尝试匹配玩家
    this.matchPlayers();
  }

  async handleAnswer(msg, socket) {
    console.log('用户回答得答案', msg);

    const { game_id, data: { id } } = msg;
    const game = this.app.games.find(i => i.game_id === game_id);
    if (!game) {
      socket.send(
        JSON.stringify({ type: "error", message: "Game not found." })
      );
      return;
    }
    const player = game.players.find((p) => p.socket === socket);
    if (!player) {
      socket.send(
        JSON.stringify({ type: "error", message: "Player not found." })
      );
      return;
    }
    // 检查答案是否正确
    const correct_id = game.questions[game.currentQuestion].correct_id;
    const isCorrect = id === correct_id;
    const num = isCorrect ? 100 : 0

    const item = game.wordList.find(i => i.id === id)
    const key = player['id']
    item[key] = isCorrect

    player.userinfo.score += num;
    player.answered = true
    this.sendUserInfo(game, 'result', { correct_id });
    if (player.userinfo.score === 1000 && game.players.every(i => !i.userinfo.is_winner)) {
      player.userinfo.is_winner = true;
      this.endGame(game);
    }

  }

  sendUserInfo(game, type = 'userinfo', props = {}) {
    game.players.forEach((player) => {
      const otherPlayer = game.players.find((p) => p !== player);
      player.socket.send(
        JSON.stringify({
          type,
          ...props,
          answered: player.answered,
          userinfo: { ...player.userinfo },
          otherUserinfo: { ...otherPlayer.userinfo },
        })
      );
    });
  }

  handleDisconnect(socket) {
    // 找到断开连接的玩家所在的对战
    const game = this.app.games.find((game) =>
      game.players.some((p) => p.socket === socket)
    );

    if (game) {
      const opponent = game.players.find((p) => p.socket !== socket);
      if (opponent) {
        // 通知对手对方已断开连接
        opponent.socket.send(
          JSON.stringify({
            type: "opponent_disconnect",
            message: "Your opponent has disconnected.",
          })
        );
      }
      // 结束对战
      this.endGame(game);
    }
  }

  matchPlayers() {
    // 如果队列中有偶数个玩家，则开始匹配
    if (this.app.playersQueue.length >= 2) {
      const player1 = this.app.playersQueue.shift();
      const player2 = this.app.playersQueue.shift();

      // 创建对战
      this.startGame(player1, player2);
    }
  }

  async generateQuestions() {
    const { ctx } = this;
    const res = await ctx.model.Words.findAll({
      limit: 10,
      order: [[this.app.Sequelize.fn("RAND"), "ASC"]],
      attributes: ["word", "id", "mean", "part"],
    });
    const wordList = res.map((item) => item.dataValues);
    const questions = wordList.map((word) => {
      const options = [{ mean: word.mean, id: word.id, part: word.part }]
      const arr = wordList.filter((w) => w.id !== word.id).map((w) => ({
        mean: w.mean,
        id: w.id,
        part: w.part,
      })).sort(() => Math.random() - 0.5).slice(0, 3);
      options.push(...arr);
      shuffleArr(options);
      return {
        word: word.word,
        options,
        correct_id: word.id,
      };
    });
    return {
      questions,
      wordList
    };
  }
  async startGame(player1, player2) {
    const { questions, wordList } = await this.generateQuestions();
    const game = {
      players: [player1, player2],
      questions,
      currentQuestion: 0,
      game_id: uuidv4(),
      wordList
    };

    this.app.games.push(game);

    // 发送开始游戏的消息
    this.sendUserInfo(game, "start", { game_id: game.game_id });
  }

  async startQuestion(id, socket) {
    // 开始第一题
    try {
      const game = this.app.games.find((item) => item.game_id === id);

      const player = game.players.find((p) => p.socket === socket);
      player.be_ready = true;
      // 检查是否所有玩家都已准备好
      if (game.players.every((p) => p.be_ready)) {
        this.startNextQuestion(game);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  startNextQuestion(game) {
    const that = this
    game.players.forEach((player) => {
      player.answered = false;
    });
    const { questions, currentQuestion } = game;

    if (currentQuestion >= 1) {
      // 游戏结束
      this.endGame(game);
      return;
    }

    function sendQuestion(data) {
      game.players.forEach((player) => {
        player.socket.send(JSON.stringify(data));
      });
    }

    const question = questions[currentQuestion];
    // 设置10秒倒计时
    let time = 10;
    const data = {
      type: "question",
      questionId: currentQuestion,
      word: question.word,
      options: question.options,
    };

    sendQuestion(data);
    sendQuestion({ time, type: 'time' });

    function countdown() {
      time--
      setTimeout(() => {
        const allFinish = game.players.every((player) => player.answered);
        if (time < 0 || allFinish) {
          setTimeout(() => {
            game.currentQuestion += 1;
            that.startNextQuestion(game);
          }, 1000);
        } else {
          sendQuestion({ time, type: 'time' });
          countdown()
        }
      }, 1000);
    }
    countdown();
  }

  endGame(game) {
    const { players, wordList } = game;
    const [p1, p2] = players
    const hasWinner = players.some(p => p.is_winner)
    if (!hasWinner) {
      p1.userinfo.score > p2.userinfo.score ? p1.userinfo.is_winner = true : p2.userinfo.is_winner = true;
    }

    players.forEach((player) => {
      const otherPlayer = players.find((p) => p !== player);
      const otherId = otherPlayer.id;
      const id = player.id
      const resultList = wordList.map(item => {
        const answerResult = item[id] ? true : false
        const otherAnswerResult = item[otherId] ? true : false
        return {
          word: item.word,
          answerResult,
          otherAnswerResult,
          part: item.part,
          mean: item.mean,
        }
      })
      player.socket.send(
        JSON.stringify({
          type: "end",
          resultList,
          userinfo: { ...player.userinfo },
          otherUserinfo: { ...otherPlayer.userinfo },
        })
      );
    });

    // 从游戏列表中移除
    this.app.games = this.app.games.filter((g) => g !== game);
  }
}

module.exports = InteractionService;
