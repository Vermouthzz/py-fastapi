const { Service } = require("egg");

class WordService extends Service {
  async getWordList(ctx) {
    return 111;
  }

  async getGameWordList() {
    const wordList = await this.ctx.model.Word.find();
  }
}

module.exports = WordService;
