const InteractionService = require('../service/interaction');
module.exports = app => {
    class Interaction extends app.Controller {
        async joinAttack() {
            const { ctx } = this;
            return await InteractionService.joinAttack(ctx);
    }
}
}