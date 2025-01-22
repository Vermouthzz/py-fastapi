const { Service } = require("egg");

class WordService extends Service {
  async getWordList(ctx) {
    return 111;
  }
}

module.exports = WordService;
