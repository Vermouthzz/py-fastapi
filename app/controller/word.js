const { Controller } = require("egg");

class wordController extends Controller {
  async index() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    const data = await ctx.service.word.getWords(page, size);
    ctx.body = data;
  }

  async create() {
    const { ctx } = this;
    const { word, meaning, example } = ctx.request.body;
  }
}
module.exports = wordController;
