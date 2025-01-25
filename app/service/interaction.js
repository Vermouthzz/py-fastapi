const { Service } = require("egg");
const { v4: uuidv4 } = require('uuid');
class InteractionService extends Service {
  constructor(ctx) {
    super(ctx);
    this.app = ctx.app;
    this.playersQueue = []; // 玩家队列
    this.games = []; // 当前进行中的对战
  }

  async joinAttack() {
    const { ctx } = this;

    ctx.websocket.on("message", async (data) => {

      const message = JSON.parse(data);

      if (message.type === "join") {
        // 玩家加入对战
        await this.handleJoin(message, ctx.websocket);
      } else if (message.type === "answer") {
        // 处理答案
        await this.handleAnswer(message, ctx.websocket);
      }
    });

    ctx.websocket.on("close", (e) => {
      console.log("WebSocket connection closed:", e);
      this.handleDisconnect(ctx.websocket);
    });
  }

  async handleJoin(data, socket) {
    const { username } = data;
    const player = { username, socket };

    // 将玩家加入队列
    this.playersQueue.push(player);

    // 尝试匹配玩家
    this.matchPlayers();
  }

  async handleAnswer(data, socket) {
    const { questionId, answer } = data;
    const game = this.games.find(game => game.players.some(p => p.socket === socket));

    if (!game) {
      socket.send(JSON.stringify({ type: "error", message: "Game not found." }));
      return;
    }

    const player = game.players.find(p => p.socket === socket);
    if (!player) {
      socket.send(JSON.stringify({ type: "error", message: "Player not found." }));
      return;
    }

    // 检查答案是否正确
    const isCorrect = answer === game.questions[questionId].correctAnswer;
    player.score += isCorrect ? 1 : 0;

    // 发送结果
    socket.send(JSON.stringify({ type: "result", questionId, isCorrect }));
  }

  handleDisconnect(socket) {
    // 找到断开连接的玩家所在的对战
    const game = this.games.find(game => game.players.some(p => p.socket === socket));
    if (game) {
      const opponent = game.players.find(p => p.socket !== socket);
      if (opponent) {
        // 通知对手对方已断开连接
        opponent.socket.send(JSON.stringify({ type: "opponent_disconnect", message: "Your opponent has disconnected." }));
      }
      // 结束对战
      this.endGame(game);
    }
  }

  matchPlayers() {
    // 如果队列中有偶数个玩家，则开始匹配
    if (this.playersQueue.length >= 2) {
      const player1 = this.playersQueue.shift();
      const player2 = this.playersQueue.shift();

      // 创建对战
      this.startGame(player1, player2);
    }
  }

  async startGame(player1, player2) {
    const wordList = await this.ctx.service.word.getWords();
    const questions = wordList.slice(0, 10); // 获取10个单词
    const game = { players: [player1, player2], questions, currentQuestion: 0, id: uuidv4() };

    this.games.push(game);

    // 发送开始游戏的消息
    player1.socket.send(JSON.stringify({ type: "start", message: "Game started!" }));
    player2.socket.send(JSON.stringify({ type: "start", message: "Game started!" }));

    // 开始第一题
    this.startNextQuestion(game);
  }

  startNextQuestion(game) {
    const { questions, currentQuestion } = game;

    if (currentQuestion >= questions.length) {
      // 游戏结束
      this.endGame(game);
      return;
    }

    const question = questions[currentQuestion];
    const data = {
      type: "question",
      questionId: currentQuestion,
      word: question.word,
      options: question.options,
      time: 10,
    };

    game.players.forEach(player => {
      player.socket.send(JSON.stringify(data));
    });

    // 设置10秒倒计时
    setTimeout(() => {
      game.currentQuestion += 1;
      this.startNextQuestion(game);
    }, 10000);
  }

  endGame(game) {
    const { players } = game;
    const winner = players.reduce((a, b) => a.score > b.score ? a : b);

    players.forEach(player => {
      player.socket.send(JSON.stringify({ type: "end", message: `Game over! Winner: ${winner.username}` }));
    });

    // 从游戏列表中移除
    this.games = this.games.filter(g => g !== game);
  }
}

module.exports = InteractionService;