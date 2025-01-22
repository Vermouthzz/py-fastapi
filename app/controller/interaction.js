const { Controller } = require("egg");

class InteractionController extends Controller {
  async joinAttack() {
    const { ctx } = this;
    return await ctx.service.interaction.joinAttack();
  }
}
module.exports = InteractionController;
